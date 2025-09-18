const IMG_BASE_URL = "https://chat.bitmaxtest.com/admin/public/uploads/";

export const getFullImageUrl = (path, fallback) => {
  if (!path) return fallback;   // no image path, use fallback
  if (path.startsWith("http")) return path; // already full URL
  return `${IMG_BASE_URL}${path}`;
};