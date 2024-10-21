"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Modal, Button, Progress, ConfigProvider } from "antd";

SwiperCore.use([Navigation, Autoplay]);

const stories = Array(20)
  .fill(null)
  .map((_, index) => ({
    name: `Story ${index + 1}`,
    image: `https://picsum.photos/170/300?random=${index}`,
    video:
      index % 3 === 0 ? "https://player.vimeo.com/video/1021432921" : undefined,
    description: `Description for Story ${index + 1}`,
    link: `https://example.com/story${index + 1}`,
  }));

const Story = () => {
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const mainSwiperRef = useRef(null);
  const modalSwiperRef = useRef(null);
  const iframeRef = useRef(null);

  const handleOpen = (story, index) => {
    setSelectedStory(story);
    setCurrentIndex(index);
    setOpen(true);
    setProgress(0);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStory(null);
    setProgress(0);
  };

  const handleNext = () => {
    if (modalSwiperRef.current) {
      modalSwiperRef.current.slideNext();
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (modalSwiperRef.current) {
      modalSwiperRef.current.slidePrev();
      setProgress(0);
    }
  };

  useEffect(() => {
    let timer;
    if (open && selectedStory) {
      setProgress(0);
      const duration = selectedStory.video ? 10 : 9;
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / duration / 10;
          if (newProgress >= 100) {
            clearInterval(timer);
            handleNext();
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [open, selectedStory, currentIndex]);

  const CustomPrevButton = () => (
    <Button
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#ffffff"
          viewBox="0 0 256 256"
        >
          <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
        </svg>
      }
      onClick={() => mainSwiperRef.current?.slidePrev()}
      style={{
        position: "absolute",
        left: "-10px",
        zIndex: 900,
        background: "transparent",
        border: "none",
      }}
    />
  );

  const CustomNextButton = () => (
    <Button
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#ffffff"
          viewBox="0 0 256 256"
        >
          <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
        </svg>
      }
      onClick={() => mainSwiperRef.current?.slideNext()}
      style={{
        position: "absolute",
        right: "-10px",
        zIndex: 900,
        background: "transparent",
        border: "none",
      }}
    />
  );

  return (
    <div
      style={{
        width: "95vw",
        height: "300px",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        className="mySwiper"
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
          1440: { slidesPerView: "auto" },
        }}
      >
        {stories.map((story, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleOpen(story, index)}
            style={{ width: "170px", maxWidth: "170px" }}
          >
            <img
              src={story.image}
              alt={story.name}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                maxWidth: "170px",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <CustomPrevButton />
      <CustomNextButton />
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Modal
          open={open}
          onCancel={handleClose}
          footer={null}
          width={400}
          style={{ top: 20 }}
          height={700}
          modalRender={(modal) => (
            <div style={{ backgroundColor: "transparent", boxShadow: "none" }}>
              {modal}
            </div>
          )}
          closeIcon={
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </div>
          }
        >
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1001,
              paddingInline: "20px",
            }}
          />

          <Swiper
            onSwiper={(swiper) => (modalSwiperRef.current = swiper)}
            initialSlide={currentIndex}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex);
              setProgress(0);
            }}
          >
            {stories.map((story, index) => (
              <SwiperSlide key={index}>
                {story.video ? (
                  <iframe
                    ref={iframeRef}
                    src={`${story.video}?autoplay=1&loop=1&background=1`}
                    height="100%"
                    width="100%"
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                      border: "none",
                      outline: "none",
                      minHeight: "700px",
                      minWidth: "400px",
                      maxWidth: "400px",
                      maxHeight: "700px",
                    }}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={story.image}
                    alt={story.name}
                    style={{
                      width: "100%",
                      height:
                        typeof window !== "undefined" && window.innerWidth > 480
                          ? "96vh"
                          : "82vh",
                      borderRadius: "10px",
                      objectFit: "cover",
                      maxWidth: "400px",
                      maxHeight: "700px",
                    }}
                  />
                )}
                {story.link && (
                  <Button
                    type="primary"
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: "absolute",
                      bottom: "60px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "10px 30px",
                      borderRadius: "10px",
                    }}
                  >
                    Visit Now
                  </Button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            onClick={handlePrev}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40%",
              height: "100%",
              cursor: "pointer",
              zIndex: 1000,
            }}
          />
          <div
            onClick={handleNext}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40%",
              height: "100%",
              cursor: "pointer",
              zIndex: 1000,
            }}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Story;
