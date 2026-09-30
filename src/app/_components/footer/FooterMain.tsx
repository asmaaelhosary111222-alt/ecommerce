import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";

const columns = [
  {
    heading: "Shop",
    links: [
      "All Products",
      "Categories",
      "Brands",
      "Electronics",
      "Men's Fashion",
      "Women's Fashion",
    ],
  },
  {
    heading: "Account",
    links: [
      "My Account",
      "Order History",
      "Wishlist",
      "Shopping Cart",
      "Sign In",
      "Create Account",
    ],
  },
  {
    heading: "Support",
    links: [
      "Contact Us",
      "Help Center",
      "Shipping Info",
      "Returns & Refunds",
      "Track Order",
    ],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function FooterMain() {
  return (
    <section
      aria-label="Footer navigation"
      className="w-full bg-slate-950"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-8">
        <FooterBrand />

        {columns.map(({ heading, links }) => (
          <FooterLinks
            key={heading}
            heading={heading}
            links={links}
          />
        ))}
      </div>
    </section>
  );
}