import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

export interface SequenceMetadata {
    startFrame: number;
    frameCount: number;
    extension: "webp" | "jpg" | "png" | "jpeg";
    prefix: string;
    padLength: number;
    // Base URL for fetching from Supabase (if configured)
    supabaseBaseUrl: string | null;
}

export async function getSequenceMetadata(): Promise<SequenceMetadata> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME;
    
    // If Supabase is fully configured, fetch metadata directly from the bucket
    if (supabaseUrl && bucketName) {
        try {
            // We only need the public URL and don't strictly need a service key for listing if the bucket is public,
            // but the Supabase JS client requires a key. If we don't have a key on the server (e.g., standard deployment),
            // we will just use a hardcoded assumption based on the upload script, OR require an anon key.
            // However, the cleanest approach is to fetch the bucket list using the REST API or client if an anon key is provided.
            // Since we know the sequence was uploaded via the script (192 frames, start 86400, png),
            // and we want this to be dynamic but fast, we can either hardcode the fallback or fetch it.
            
            // To make this robust without needing the user to supply an API key in production just for listing,
            // we can assume the upload script configures the sequence, OR we can fetch the list.
            // Let's use the REST API approach for public buckets if we don't have a key:
            const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
            
            if (anonKey) {
                const supabase = createClient(supabaseUrl, anonKey);
                const { data, error } = await supabase.storage.from(bucketName).list('sequence', { limit: 1000 });
                
                if (!error && data && data.length > 0) {
                    const imageFiles = data.filter(f => /\.(png|webp|jpe?g)$/i.test(f.name)).sort((a, b) => a.name.localeCompare(b.name));
                    
                    if (imageFiles.length > 0) {
                        const firstFile = imageFiles[0].name;
                        const match = firstFile.match(/^([a-zA-Z_]+)?(\d+)\.(png|webp|jpe?g)$/i);
                        
                        if (match) {
                            return {
                                startFrame: parseInt(match[2], 10),
                                frameCount: imageFiles.length,
                                extension: match[3].toLowerCase() as any,
                                prefix: match[1] || "",
                                padLength: match[2].length,
                                supabaseBaseUrl: `${supabaseUrl}/storage/v1/object/public/${bucketName}`
                            };
                        }
                    }
                }
            } else {
                // If no keys are provided but bucket is configured, we assume the known PNG sequence structure 
                // to avoid breaking the build if the user forgot the anon key.
                return {
                    startFrame: 86400,
                    frameCount: 192,
                    extension: "png",
                    prefix: "frame",
                    padLength: 8,
                    supabaseBaseUrl: `${supabaseUrl}/storage/v1/object/public/${bucketName}`
                };
            }
        } catch (e) {
            console.error("Failed to read Supabase sequence metadata", e);
        }
    }

    // Fallback to local filesystem (for local dev before upload)
    try {
        const sequenceDir = path.join(process.cwd(), "public", "sequence");
        if (fs.existsSync(sequenceDir)) {
            const files = fs.readdirSync(sequenceDir);
            const imageFiles = files.filter(f => /\.(png|webp|jpe?g)$/i.test(f)).sort();
            
            if (imageFiles.length > 0) {
                const firstFile = imageFiles[0];
                const match = firstFile.match(/^([a-zA-Z_]+)?(\d+)\.(png|webp|jpe?g)$/i);
                
                if (match) {
                    return {
                        startFrame: parseInt(match[2], 10),
                        frameCount: imageFiles.length,
                        extension: match[3].toLowerCase() as any,
                        prefix: match[1] || "",
                        padLength: match[2].length,
                        supabaseBaseUrl: null
                    };
                }
            }
        }
    } catch (e) {
        console.error("Failed to read local sequence directory", e);
    }
    
    // Absolute fallback
    return {
        startFrame: 0,
        frameCount: 119,
        extension: "webp",
        prefix: "frame_",
        padLength: 3,
        supabaseBaseUrl: null
    };
}
