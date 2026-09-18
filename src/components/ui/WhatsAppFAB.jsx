import { useGetBusinessForUserQuery } from "../../api/adminApi"




/**
 * Persistent floating contact button -- the single highest-converting
 * contact method for BD gyms. Fixed bottom-right, offset for mobile safe
 * area. Links out to WhatsApp; swap WHATSAPP_URL for a real number later.
 */
export default function WhatsAppFAB() {

  const {data}=useGetBusinessForUserQuery()
  const business = data?.data;
  
  return (
    <a
      href={`https://wa.me/+88${business?.phone}` || `https://wa.me/01xxxxxxxxx`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13c-1.48 0-2.94-.4-4.2-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 01-1.26-4.4c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 012.4 5.81c0 4.54-3.69 8.28-8.19 8.28zm4.51-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.11-.22-.17-.47-.29z" />
      </svg>
    </a>
  )
}
