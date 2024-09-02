import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Lightbox from "react-image-lightbox"

import "./styles.scss"
import "react-lazy-load-image-component/src/effects/blur.css"
import "react-image-lightbox/style.css"

const params = {
  spaceBetween: 10,
  slidesPerView: 1,
  navigation: true,
  pagination: {
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
}

SwiperCore.use([Navigation, Pagination])

const SwiperMultiSlides = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  return (
    <>
      <Swiper {...params} className="multi_slides">
        {images?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => {
                setSelectedImage(index)
              }}
              className="cursor-pointer"
            >
              <LazyLoadImage
                alt={""}
                width={"100%"}
                height={"100%"}
                src={item} // use normal <img> attributes as props
                effect="blur"
                className="img-fluid"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {selectedImage !== null && (
        <div className="lightbox">
          <Lightbox
            mainSrc={images[selectedImage]}
            nextSrc={images[(selectedImage + 1) % images.length]}
            prevSrc={images[(selectedImage + images.length - 1) % images.length]}
            onCloseRequest={() => setSelectedImage(null)}
            onMovePrevRequest={() => setSelectedImage((selectedImage + images.length - 1) % images.length)}
            onMoveNextRequest={() => setSelectedImage((selectedImage + 1) % images.length)}
          />
        </div>
      )}
    </>
  )
}

export default SwiperMultiSlides
