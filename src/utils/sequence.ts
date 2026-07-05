import fs from "fs";
import path from "path";

export interface SequenceMetadata {
    startFrame: number;
    frameCount: number;
    extension: "webp" | "jpg" | "png" | "jpeg";
    prefix: string;
    padLength: number;
}

export function getSequenceMetadata(): SequenceMetadata {
    try {
        const sequenceDir = path.join(process.cwd(), "public", "sequence");
        const files = fs.readdirSync(sequenceDir);
        
        // Filter for valid image formats
        const imageFiles = files.filter(f => /\.(png|webp|jpe?g)$/i.test(f)).sort();
        
        if (imageFiles.length === 0) {
            console.warn("No sequence frames found in public/sequence");
            return { startFrame: 0, frameCount: 119, extension: "webp", prefix: "frame", padLength: 3 };
        }

        const firstFile = imageFiles[0];
        // Match things like frame00086400.png or image_001.webp
        const match = firstFile.match(/^([a-zA-Z_]+)?(\d+)\.(png|webp|jpe?g)$/i);
        
        if (match) {
            const prefix = match[1] || "";
            const numStr = match[2];
            const extension = match[3].toLowerCase() as "webp" | "jpg" | "png" | "jpeg";
            const startFrame = parseInt(numStr, 10);
            const padLength = numStr.length;
            const frameCount = imageFiles.length;

            return {
                startFrame,
                frameCount,
                extension,
                prefix,
                padLength
            };
        }
        
    } catch (e) {
        console.error("Failed to read sequence directory", e);
    }
    
    // Default fallback
    return {
        startFrame: 0,
        frameCount: 119,
        extension: "webp",
        prefix: "frame_",
        padLength: 3
    };
}
