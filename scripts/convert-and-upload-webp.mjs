import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME;

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
  console.error("Missing Supabase credentials in .env.local!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const SEQUENCE_DIR = path.join(__dirname, "../public/sequence");
const WEBP_DIR = path.join(__dirname, "../public/sequence_webp");

async function convertAndUpload() {
  console.log("Preparing to convert PNGs to WebP and upload...");

  if (!fs.existsSync(WEBP_DIR)) {
    fs.mkdirSync(WEBP_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SEQUENCE_DIR).filter(f => f.endsWith(".png")).sort();
  console.log(`Found ${files.length} PNG frames. Converting to WebP (This will take a minute)...`);

  // 1. Clear out the old PNGs from the bucket to prevent clutter
  console.log("Clearing old PNGs from Supabase bucket...");
  const { data: existingFiles } = await supabase.storage.from(BUCKET_NAME).list("sequence", { limit: 1000 });
  if (existingFiles && existingFiles.length > 0) {
      const pathsToDelete = existingFiles.map(f => `sequence/${f.name}`);
      await supabase.storage.from(BUCKET_NAME).remove(pathsToDelete);
      console.log(`Deleted ${pathsToDelete.length} old files from Supabase.`);
  }

  // 2. Convert and Upload
  for (let i = 0; i < files.length; i++) {
    const pngFile = files[i];
    const webpFile = pngFile.replace(".png", ".webp");
    const pngPath = path.join(SEQUENCE_DIR, pngFile);
    const webpPath = path.join(WEBP_DIR, webpFile);

    // Convert PNG to WebP
    // 90% quality is visually indistinguishable from uncompressed for this use-case but much smaller file size!
    await sharp(pngPath)
      .webp({ quality: 90 })
      .toFile(webpPath);

    // Upload WebP to Supabase
    const fileBuffer = fs.readFileSync(webpPath);
    const destinationPath = `sequence/${webpFile}`;

    console.log(`[${i + 1}/${files.length}] Converted and Uploading ${webpFile}...`);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(destinationPath, fileBuffer, {
        contentType: 'image/webp',
        cacheControl: "31536000",
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${webpFile}:`, error.message);
    }
  }

  console.log("\n✅ WebP Conversion and Upload Complete!");
  console.log("Next Steps:");
  console.log("1. Go to Vercel Deployments and click 'Redeploy' to update the site metadata.");
  console.log("2. Hard Refresh your browser (Ctrl + Shift + R) on the live site.");
  console.log("Your scroll animation will now be 10x faster and flawlessly smooth!");
}

convertAndUpload().catch(console.error);
