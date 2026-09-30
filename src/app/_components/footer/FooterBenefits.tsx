import { Truck, RefreshCw, ShieldCheck, Headset } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    subtitle: "14-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    subtitle: "100% secure checkout",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    subtitle: "Contact us anytime",
  },
];

export default function FooterBenefits() {
  return (
    <section
      aria-label="Shopping benefits"
      className="w-full border-b border-green-100 bg-green-50"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-4 lg:gap-6">
        {benefits.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="group flex min-w-0 items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-green-100/60 hover:shadow-sm"
          >
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12"
            >
              <Icon className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-gray-900">
                {title}
              </p>

              <p className="text-xs leading-5 text-gray-500">
                {subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}