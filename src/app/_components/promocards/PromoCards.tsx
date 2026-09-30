import { FiArrowRight } from "react-icons/fi";
import { HiSparkles, HiFire } from "react-icons/hi2";
import type { IconType } from "react-icons";

interface PromoCard {
  id: string;
  badgeIcon: IconType;
  badgeText: string;
  title: string;
  subtitle: string;
  discount: string;
  coupon: string;
  buttonText: string;
  gradient: string;
  buttonTextColor: string;
}

const promoCards: PromoCard[] = [
  {
    id: "fruits",
    badgeIcon: HiFire,
    badgeText: "Deal of the Day",
    title: "Fresh Organic Fruits",
    subtitle: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    coupon: "ORGANIC40",
    buttonText: "Shop Now",
    gradient: "bg-gradient-to-br from-emerald-500 to-green-700",
    buttonTextColor: "text-green-600",
  },
  {
    id: "vegetables",
    badgeIcon: HiSparkles,
    badgeText: "New Arrivals",
    title: "Exotic Vegetables",
    subtitle:
      "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    coupon: "FRESH25",
    buttonText: "Explore Now",
    gradient: "bg-gradient-to-br from-orange-500 to-pink-600",
    buttonTextColor: "text-orange-600",
  },
];

export default function PromoCards() {
  return (
    <section
      aria-labelledby="promo-cards-title"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <h2 id="promo-cards-title" className="sr-only">
        Special offers
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {promoCards.map((card) => {
          const BadgeIcon = card.badgeIcon;

          return (
            <article
              key={card.id}
              className={`group relative overflow-hidden rounded-2xl ${card.gradient} p-6 text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl sm:p-8`}
            >
              {/* Decorative shapes */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-6 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110"
              />

              {/* Content */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                  <BadgeIcon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />

                  {card.badgeText}
                </span>

                <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                  {card.title}
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
                  {card.subtitle}
                </p>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-3">
                  <span className="text-3xl font-extrabold sm:text-4xl">
                    {card.discount}
                  </span>

                  <span className="text-sm text-white/90">
                    Use code:{" "}
                    <span className="font-bold">
                      {card.coupon}
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  className={`mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 font-semibold ${card.buttonTextColor} shadow-sm transition-all duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700 active:scale-[0.98]`}
                >
                  {card.buttonText}

                  <FiArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}