"use client";

import React from "react";
import { Typography, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const defaultName = "Organic & Healthy Foods Provider Farming";
const defaultCategories = [
  {
    name: "Juice",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-03.webp?v=1702379752&width=1920",
  },
  {
    name: "Meat",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-04.webp?v=1702379752&width=1920",
  },
  {
    name: "Vegetables",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-05.webp?v=1702379752&width=1920",
  },
  {
    name: "Fruits",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-02.webp?v=1702379752&width=1920",
  },
  {
    name: "Dairy",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-07.webp?v=1702379737&width=1920",
  },
  {
    name: "Bakery",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-01.webp?v=1702379752&width=1920",
  },
  {
    name: "Seafood",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-02.webp?v=1702379752&width=1920",
  },
  {
    name: "Bakery",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-01.webp?v=1702379752&width=1920",
  },
  {
    name: "Seafood",
    productCount: 10,
    image:
      "https://greengrub-theme.myshopify.com/cdn/shop/files/L03-category-02.webp?v=1702379752&width=1920",
  },
];

const CategoriesSlider = ({
  name = defaultName,
  categories = defaultCategories,
}) => {
  const shouldAutoplayLarge = categories.length > 7;
  const shouldAutoplaySmall = categories.length > 2;

  return (
    <div className="max-w-[90vw] mx-auto pb-10 sm:pb-16 md:pb-20 lg:pb-24 pt-10">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Typography.Text className="text-primary text-sm md:text-base uppercase tracking-widest mb-2">
            SHOP BY CATEGORIES
          </Typography.Text>
          <Typography.Title
            level={2}
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            {name}
          </Typography.Title>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: Math.min(2, categories.length),
              autoplay: shouldAutoplaySmall
                ? { delay: 1000, disableOnInteraction: false }
                : false,
            },
            768: {
              slidesPerView: Math.min(4, categories.length),
              autoplay: shouldAutoplayLarge
                ? { delay: 1000, disableOnInteraction: false }
                : false,
            },
            1024: {
              slidesPerView: Math.min(5, categories.length),
              autoplay: shouldAutoplayLarge
                ? { delay: 1000, disableOnInteraction: false }
                : false,
            },
            1200: {
              slidesPerView: Math.min(7, categories.length),
              autoplay: shouldAutoplayLarge
                ? { delay: 1000, disableOnInteraction: false }
                : false,
            },
          }}
          autoplay={
            shouldAutoplaySmall
              ? { delay: 1000, disableOnInteraction: false }
              : false
          }
          loop={shouldAutoplaySmall}
          modules={[Autoplay]}
        >
          {[...categories, ...categories].map((category, index) => (
            <SwiperSlide key={index}>
              <div className="text-center flex flex-col items-center h-[200px] justify-between">
                <div className="overflow-hidden rounded-md">
                  <Image
                    width={150}
                    height={150}
                    src={category.image || "https://via.placeholder.com/300"}
                    alt={category.name}
                    loading="lazy"
                    className="w-[100px] h-[100px] object-cover rounded-md transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                </div>
                <Typography.Title
                  level={4}
                  className="mt-4 text-lg sm:text-xl font-bold transition-colors duration-500 hover:text-primary"
                >
                  {category.name}
                </Typography.Title>
                <Button
                  type="primary"
                  size="small"
                  className="mt-2 w-[110px] rounded-xl"
                >
                  {`${category.productCount} Product${
                    category.productCount !== 1 ? "s" : ""
                  }`}
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesSlider;
