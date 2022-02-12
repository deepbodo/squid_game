import React from "react";
import Slider from "react-styled-carousel";

import SliderItem1 from "./SliderItem1";
import SliderItem2 from "./SliderItem2";

const SlideBar = () => {
  return (
    <Slider>
      <SliderItem1 />
      <SliderItem2 />
      <SliderItem1 />
      <SliderItem1 />
    </Slider>
  );
};

export default SlideBar;
