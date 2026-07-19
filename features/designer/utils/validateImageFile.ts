// Validation rules per docs/SPECS.md §3. Oversized/unsupported files are
// rejected with a friendly message, never silently resized or converted.
const ACCEPTED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const MAX_DIMENSION_PX = 6000;

export interface ImageFileValidationResult {
  valid: boolean;
  reason?: string;
  width?: number;
  height?: number;
}

function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read image dimensions"));
    };
    img.src = objectUrl;
  });
}

export async function validateImageFile(
  file: File,
): Promise<ImageFileValidationResult> {
  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      reason: `"${file.name}" isn't a supported format. Please upload a PNG, JPEG, or WEBP image.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      reason: `"${file.name}" is ${sizeMb} MB, which is over the 20 MB limit.`,
    };
  }

  let dimensions: { width: number; height: number };
  try {
    dimensions = await getImageDimensions(file);
  } catch {
    return {
      valid: false,
      reason: `"${file.name}" couldn't be read as an image.`,
    };
  }

  if (
    dimensions.width > MAX_DIMENSION_PX ||
    dimensions.height > MAX_DIMENSION_PX
  ) {
    return {
      valid: false,
      reason: `"${file.name}" is ${dimensions.width}x${dimensions.height}px, which is larger than the 6000x6000px limit.`,
    };
  }

  return { valid: true, width: dimensions.width, height: dimensions.height };
}
