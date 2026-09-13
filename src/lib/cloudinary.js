// ---------------------------------------------------------------------------
// Cloudinary helper. Until real assets are uploaded, components use direct
// Unsplash URLs as placeholders. Once VITE_CLOUDINARY_CLOUD_NAME is set,
// swap an <img src="..."> for cldUrl(publicId, opts) to get an optimized,
// responsive delivery URL with on-the-fly transforms (never store raw
// uploads -- always request a transformed size/format).
// ---------------------------------------------------------------------------

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export function cldUrl(publicId, { width = 800, quality = 'auto', format = 'auto', crop = 'fill' } = {}) {
  if (!CLOUD_NAME) {
    // No Cloudinary configured yet -- caller should fall back to a static
    // placeholder image rather than render a broken <img>.
    return null
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_${format},q_${quality},c_${crop},w_${width}/${publicId}`
}

/**
 * Uploads a File to Cloudinary using an unsigned upload preset. Used by
 * admin/member screens that accept photo uploads (trainer photos, gallery,
 * progress photos, bKash QR code). Compression/transforms happen via the
 * preset server-side -- raw files are never stored as-is.
 */
export async function uploadToCloudinary(file) {
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  if (!CLOUD_NAME || !uploadPreset) {
    throw new Error('Cloudinary is not configured yet — set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env')
  }
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) throw new Error('Cloudinary upload failed')
  return response.json()
}
