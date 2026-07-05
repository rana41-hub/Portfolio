import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Need to explicitly load .env.local for local script execution
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME;

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
  console.error("Missing required environment variables in .env.local:");
  console.error("- NEXT_PUBLIC_SUPABASE_URL");
  console.error("- SUPABASE_SERVICE_ROLE_KEY");
  console.error("- NEXT_PUBLIC_SUPABASE_BUCKET_NAME");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SEQUENCE_DIR = path.join(__dirname, "..", "public", "sequence");

async function uploadSequence() {
  console.log(`Starting upload to Supabase bucket: ${BUCKET_NAME}`);
  
  if (!fs.existsSync(SEQUENCE_DIR)) {
    console.error(`Directory not found: ${SEQUENCE_DIR}`);
    console.error("Please make sure your PNG sequence is in public/sequence before uploading.");
    process.exit(1);
  }

  const files = fs.readdirSync(SEQUENCE_DIR).filter(f => /\.(png|webp|jpe?g)$/i.test(f)).sort();
  
  if (files.length === 0) {
    console.log("No images found in public/sequence to upload.");
    return;
  }

  console.log(`Found ${files.length} frames to upload.`);
  
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(SEQUENCE_DIR, file);
    const fileBuffer = fs.readFileSync(filePath);
    const fileExtension = path.extname(file).slice(1);
    
    // We determine content type based on extension
    const contentType = fileExtension === 'png' ? 'image/png' 
                      : fileExtension === 'webp' ? 'image/webp' 
                      : 'image/jpeg';

    const destinationPath = `sequence/${file}`;

    console.log(`[${i + 1}/${files.length}] Uploading ${file}...`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(destinationPath, fileBuffer, {
        contentType,
        cacheControl: "31536000",
        upsert: false // Don't overwrite if it already exists to save time
      });

    if (error) {
      if (error.message === "The resource already exists") {
        console.log(`  -> Skipped: ${file} already exists in bucket.`);
        skipCount++;
      } else {
        console.error(`  -> Error uploading ${file}:`, error.message);
        failCount++;
      }
    } else {
      console.log(`  -> Success!`);
      successCount++;
    }
  }

  console.log("\n--- Upload Summary ---");
  console.log(`Total files: ${files.length}`);
  console.log(`Successfully uploaded: ${successCount}`);
  console.log(`Skipped (already exist): ${skipCount}`);
  console.log(`Failed: ${failCount}`);
  
  if (failCount === 0) {
    console.log("\nAll files are safely in Supabase Storage! You can now safely delete the local public/sequence folder.");
  } else {
    console.log("\nSome files failed to upload. Please review the errors above.");
  }
}

uploadSequence();
