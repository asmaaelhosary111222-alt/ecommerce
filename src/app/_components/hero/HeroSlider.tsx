"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1600",
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    image:
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1600",
  },
];

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section
      aria-label="Featured offers"
      className="relative w-full overflow-hidden"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.realIndex);
        }}
        pagination={{
          clickable: true,
        }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="
          w-full

          [&_.swiper-pagination]:!bottom-4

          [&_.swiper-pagination-bullet]:!h-3
          [&_.swiper-pagination-bullet]:!w-3
          [&_.swiper-pagination-bullet]:!rounded-full
          [&_.swiper-pagination-bullet]:!bg-white
          [&_.swiper-pagination-bullet]:!opacity-50

          [&_.swiper-pagination-bullet]:!transition-all
          [&_.swiper-pagination-bullet]:!duration-500
          [&_.swiper-pagination-bullet]:!ease-in-out

          [&_.swiper-pagination-bullet-active]:!w-10
          [&_.swiper-pagination-bullet-active]:!opacity-100
        "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.image}>
            <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[28rem] lg:min-h-[32rem]">
              {/* Background image */}
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-green-700/80 via-green-600/55 to-transparent"
              />

              {/* Content */}
              <div className="relative z-10 flex min-h-[24rem] items-center px-6 py-16 sm:min-h-[28rem] sm:px-10 lg:min-h-[32rem] lg:px-16">
                <div
                  className={`max-w-xl ${
                    activeSlide === index ? "animate-hero" : ""
                  }`}
                >
                  <h1 className="max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>

                  <p className="mt-4 max-w-md text-sm text-white/90 sm:text-base">
                    {slide.subtitle}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-green-600 shadow-sm transition-all duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700 active:scale-[0.98]"
                    >
                      Shop Now
                    </button>

                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700 active:scale-[0.98]"
                    >
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous slide */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-green-600 shadow-md transition-all duration-200 hover:bg-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700 active:scale-95 sm:left-5 sm:h-12 sm:w-12"
      >
        <ChevronLeft
          size={24}
          aria-hidden="true"
        />
      </button>

      {/* Next slide */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-green-600 shadow-md transition-all duration-200 hover:bg-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700 active:scale-95 sm:right-5 sm:h-12 sm:w-12"
      >
        <ChevronRight
          size={24}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}