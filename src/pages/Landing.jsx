import Hero from './sections/Hero'
import About from './sections/About'
import Amenities from './sections/Amenities'
import MarqueeRibbon from '../components/ui/MarqueeRibbon'
import Plans from './sections/Plans'
import Trainers from './sections/Trainers'
import Schedule from './sections/Schedule'
import Testimonials from './sections/Testimonials'
import Gallery from './sections/Gallery'
import BMICalculator from './sections/BMICalculator'
import Partners from './sections/Partners'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import { useDocumentHead, useJsonLd } from '../lib/seo'
import { GYM_NAME, GYM_TAGLINE, GYM_ADDRESS, GYM_PHONE, GYM_LAT, GYM_LNG } from '../lib/constants'
import ShortPlan from '../components/ShortPlan'
import TrainerSection from './sections/TrainerSection'

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: GYM_NAME,
  description: GYM_TAGLINE,
  address: { '@type': 'PostalAddress', streetAddress: GYM_ADDRESS, addressLocality: 'Dhaka', addressCountry: 'BD' },
  telephone: GYM_PHONE,
  geo: { '@type': 'GeoCoordinates', latitude: GYM_LAT, longitude: GYM_LNG },
  priceRange: '৳৳',
  openingHours: 'Sa-Th 06:00-22:00, Fr 16:00-22:00',
}

export default function Landing() {
  useDocumentHead({ title: 'Home', description: GYM_TAGLINE })
  useJsonLd(LOCAL_BUSINESS_SCHEMA)

  return (
    <>
      <Hero />
      <About />
      <Amenities />
      <MarqueeRibbon text="TRANSFORM YOUR BODY" />
      <ShortPlan />
      <TrainerSection />
      <Schedule />
      <Testimonials />
      {/* <Gallery /> */}
      <MarqueeRibbon text="STRENGTH IS EARNED" tilt={-6} />
      <BMICalculator />
      {/* <Partners /> */}
      <FAQ />
      {/* <Contact /> */}
    </>
  )
}
