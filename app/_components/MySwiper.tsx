"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";

import s1 from "@/assets/images/slider-image-1.jpeg";
import s2 from "@/assets/images/slider-image-2.jpeg";

export default function MySwiper() {
  return (
    <div className="flex gap-2 w-full">
      {/* Main Swiper */}
      <div className="w-3/4">
        <Swiper 
          spaceBetween={10} 
          slidesPerView={1}  
          modules={[Autoplay]}  
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          <SwiperSlide>
            <Image
              src={s1}
              alt="Main image 1"
              className="w-full h-75 object-cover rounded-lg"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src={s2}
              alt="Main image 2"
              className="w-full h-75 object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Side Images */}
      <div className="w-1/4 flex flex-col gap-2">
        <Image
          src={s1}
          alt="Side image 1"
          className="w-full h-36.5 object-cover rounded-lg"
        />

        <Image
          src={s2}
          alt="Side image 2"
          className="w-full h-36.5 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}