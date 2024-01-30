import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
const SwiperProducts = ({ elements }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[
          Autoplay,
        ]}
        className="mySwiper"
      >
        {elements &&
          elements.map((ele , index) => {
            return (
              <SwiperSlide key={index}>
                <div className="ImagesMain">
                  <img src={ele} alt="images" className="w-100" />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default SwiperProducts;
