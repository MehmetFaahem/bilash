"use client";

import React, { useState } from "react";
import { Typography, Button } from "antd";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const elements = [
  {
    name: "First Banner",
    link: "https://example.com/first",
    screen: "largeScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider2.jpg?v=1709961987",
    xPosition: "center",
    buttonName: "Discover More",
    title: "Explore Our Collection",
    subtitle: "Find exclusive items in our collection",
  },
  {
    name: "First Banner",
    link: "https://example.com/first",
    screen: "largeScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider2.jpg?v=1709961987",
    xPosition: "center",
    buttonName: "Discover More",
    title: "Explore Our Collection",
    subtitle: "",
  },
  {
    name: "Second Banner",
    link: "https://example.com/second",
    screen: "smallScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider3.jpg?v=1709961990",
    xPosition: "left",
    buttonName: "Shop Now",
    title: "Summer Sale",
    subtitle: "",
  },
  {
    name: "Second Banner",
    link: "https://example.com/second",
    screen: "smallScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider3.jpg?v=1709961990",
    xPosition: "left",
    buttonName: "Shop Now",
    title: "Summer Sale",
    subtitle: "Up to 50% off on summer items",
  },
  {
    name: "Third Banner",
    link: "https://example.com/third",
    screen: "largeScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider1.jpg?v=1709961989",
    xPosition: "right",
    buttonName: "Learn More",
    title: "New Arrivals",
    subtitle: "",
  },
  {
    name: "Third Banner",
    link: "https://example.com/third",
    screen: "largeScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider1.jpg?v=1709961989",
    xPosition: "right",
    buttonName: "Learn More",
    title: "New Arrivals",
    subtitle: "Check out our new arrivals",
  },
  {
    name: "Third Banner",
    link: "https://example.com/third",
    screen: "largeScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider1.jpg?v=1709961989",
    xPosition: "right",
    buttonName: "Learn More",
    title: "New Arrivals",
    subtitle: "Check out our new arrivals",
  },
  {
    name: "Third Banner",
    link: "https://example.com/third",
    screen: "largeScreen",
    image:
      "https://mb-demo1.myshopify.com/cdn/shop/files/grocery-slider1.jpg?v=1709961989",
    xPosition: "right",
    buttonName: "Learn More",
    title: "New Arrivals",
    subtitle: "Check out our new arrivals",
  },
];

const CustomPagination = ({ totalSlides, activeIndex }) => (
  <div className="flex justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <div
        key={index}
        className={`w-4 h-4 rounded-full mx-1 cursor-pointer ${
          index === activeIndex ? "bg-white" : "bg-white bg-opacity-50"
        }`}
      />
    ))}
  </div>
);

const TriBanner = () => {
  const router = useRouter();
  const [activeIndices, setActiveIndices] = useState({
    left: 0,
    center: 0,
    right: 0,
  });

  const handleSlideChange = (position, index) => {
    setActiveIndices((prev) => ({ ...prev, [position]: index }));
  };

  return (
    <div className="text-center w-[95vw] mx-auto flex flex-col lg:flex-row gap-8 mt-10">
      {["left", "center", "right"].map((position, idx) => {
        const filteredElements = elements.filter(
          (element) => element.xPosition === position
        );
        return (
          <div
            key={position}
            className={`
              ${idx === 1 ? "w-full lg:w-1/2" : "w-full lg:w-[23%]"}
              ${idx === 1 ? "block" : "hidden lg:block"}
            `}
          >
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={(swiper) =>
                handleSlideChange(position, swiper.realIndex)
              }
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay]}
            >
              {[...filteredElements, ...filteredElements].map(
                (element, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => router.push(element.link)}
                      className="bg-center h-[500px] flex items-start justify-center p-4 relative rounded-lg cursor-pointer"
                      style={{ backgroundImage: `url(${element.image})` }}
                    >
                      <div className="mt-16">
                        <Typography.Text className="mb-4 underline text-base sm:text-lg md:text-xl tracking-widest">
                          {element.subtitle}
                        </Typography.Text>
                        <Typography.Title
                          level={2}
                          className={`mb-4 ${
                            position === "center"
                              ? "font-bold"
                              : "font-semibold"
                          } text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
                        >
                          {element.title}
                        </Typography.Title>
                        <Button
                          type="primary"
                          href={element.link}
                          className={`mt-4 px-4 py-2 text-sm sm:text-base md:text-lg ${
                            position === "center"
                              ? "bg-white text-black hover:bg-black hover:text-white"
                              : "bg-yellow-500 text-black hover:bg-black hover:text-yellow-500"
                          }`}
                        >
                          {element.buttonName}
                        </Button>
                      </div>
                    </div>
                    <CustomPagination
                      totalSlides={filteredElements.length}
                      activeIndex={activeIndices[position]}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        );
      })}
      <div className="hidden sm:flex lg:hidden flex-row justify-between">
        {["left", "right"].map((position) => {
          const filteredElements = elements.filter(
            (element) => element.xPosition === position
          );
          return (
            <div key={position} className="w-[48.3%]">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                onSlideChange={(swiper) =>
                  handleSlideChange(position, swiper.realIndex)
                }
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {[...filteredElements, ...filteredElements].map(
                  (element, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => router.push(element.link)}
                        className="bg-center h-[500px] flex items-start justify-center p-4 relative rounded-lg cursor-pointer"
                        style={{ backgroundImage: `url(${element.image})` }}
                      >
                        <div className="mt-16">
                          <Typography.Text className="mb-4 underline text-base sm:text-lg md:text-xl tracking-widest">
                            {element.subtitle}
                          </Typography.Text>
                          <Typography.Title
                            level={2}
                            className="mb-4 font-semibold text-xl sm:text-2xl md:text-3xl"
                          >
                            {element.title}
                          </Typography.Title>
                          <Button
                            type="primary"
                            href={element.link}
                            className="mt-4 px-4 py-2 text-sm sm:text-base md:text-lg bg-yellow-500 text-black hover:bg-black hover:text-yellow-500"
                          >
                            {element.buttonName}
                          </Button>
                        </div>
                      </div>
                      <CustomPagination
                        totalSlides={filteredElements.length}
                        activeIndex={activeIndices[position]}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TriBanner;
