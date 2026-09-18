// ---------------------------------------------------------------------------
// PLACEHOLDER TOKENS -- replace before launch.
// These map 1:1 to the token legend in the build brief (Section 2). Nothing
// in this file is real business data. When the client provides real copy,
// prices, hours, or media, only this file (and src/data/mockData.js) need
// to change -- no component logic should ever need to touch.
// ---------------------------------------------------------------------------

export const GYM_NAME = 'Fit Elegant Gym & Café'
export const GYM_SHORT_NAME = 'Fit Elegant'
export const GYM_TAGLINE = "Dhaka's premium strength & transformation studio"
export const GYM_ADDRESS = 'House __, Road __, Dhaka, Bangladesh' // sample
export const GYM_PHONE = '+880 12345678' // sample
export const GYM_PHONE_TEL = '+880188254685' // sample, for tel: links
export const GYM_HOURS = 'Sat–Thu: 6:00 AM – 10:00 PM · Fri: 4:00 PM – 10:00 PM' // sample
export const GYM_EMAIL = 'hello@fitelegant.example' // sample
import {useGetBusinessForUserQuery} from '../api/adminApi.js'

// Generic Dhaka, Bangladesh map center -- swap for the real address embed later.
export const GYM_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd'
export const GYM_LAT = 23.8103
export const GYM_LNG = 90.4125

export const FB_PAGE_URL = 'https://www.facebook.com/p/Fit-Elegant-Gym-Cafe-61569323227463/'

export const HERO_VIDEO = null // pass a real video src later; component falls back automatically
export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop'

export const CURRENCY_SYMBOL = '৳'

export function formatBDT(amount) {
  return `${CURRENCY_SYMBOL}${Number(amount).toLocaleString('en-US')}`
}
