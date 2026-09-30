import NewsletterContent from "./NewsletterContent";
import MobileAppCard from "./MobileAppCard";

export default function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-section-title"
      className="w-full bg-gradient-to-br from-green-50 via-white to-green-50 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-8 lg:p-12">
          <h2 id="newsletter-section-title" className="sr-only">
            Newsletter and mobile app
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_auto_1fr] lg:gap-10">
            <NewsletterContent />

            <div
              aria-hidden="true"
              className="hidden w-px bg-gray-200 lg:block"
            />

            <MobileAppCard />
          </div>
        </div>
      </div>
    </section>
  );
}