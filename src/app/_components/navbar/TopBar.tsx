import Link from "next/link";
import {
  FaTruck,
  FaGift,
  FaPhoneAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-2 text-xs text-gray-600 lg:px-36 lg:text-sm">
      {/* Left side */}
      <div className="flex items-center gap-2 lg:gap-4">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <FaTruck
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={12}
          />
          <span>Free Shipping on Orders 500 EGP</span>
        </span>

        <span className="flex items-center gap-1 whitespace-nowrap">
          <FaGift
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={12}
          />
          <span>New Arrivals Daily</span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-4">
        <a
          href="tel:+18001234567"
          className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaPhoneAlt
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={11}
          />
          <span>+1 (800) 123-4567</span>
        </a>

        <a
          href="mailto:support@freshcart.com"
          className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaEnvelope
            aria-hidden="true"
            className="shrink-0 text-green-600"
            size={11}
          />
          <span>support@freshcart.com</span>
        </a>

        <Link
          href="/login"
          className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaUser
            aria-hidden="true"
            size={11}
          />
          <span>Sign In</span>
        </Link>

        <Link
          href="/signup"
          className="flex items-center gap-1 whitespace-nowrap rounded-sm transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <FaUser
            aria-hidden="true"
            size={11}
          />
          <span>Sign Up</span>
        </Link>

        {/* No sign-out action was supplied, so this remains non-interactive. */}
        <span className="flex items-center gap-1 whitespace-nowrap">
          <FaSignOutAlt
            aria-hidden="true"
            size={11}
          />
          <span>Sign Out</span>
        </span>
      </div>
    </div>
  );
}