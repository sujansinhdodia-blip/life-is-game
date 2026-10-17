// ============================================================
//  app/page.tsx — ROOT SERVER COMPONENT
//  Reads public/images/ at build-time using Node's `fs`.
//  Passes the sorted image list to client components.
// ============================================================
import { promises as fs } from "fs";
import path from "path";
import PageClient from "@/components/PageClient";

/** Allowed image extensions */
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/**
 * getImages — runs on the server (never ships to the client).
 * Returns a sorted array of filenames from public/images/.
 */
async function getImages(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    const entries = await fs.readdir(dir);
    return entries
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    // Folder doesn't exist or can't be read — return empty array.
    // The site will still work without photos.
    console.warn(
      "[proposal-site] Could not read public/images/. " +
        "Please copy your photos there manually."
    );
    return [];
  }
}

export default async function Home() {
  const images = await getImages();

  return <PageClient images={images} />;
}
