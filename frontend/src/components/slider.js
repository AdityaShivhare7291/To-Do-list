// SliderComponent.js
import React from "react";
import Slider from "react-slick";
import './slider.css';

const SliderComponent = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        adaptiveHeight: true,
        adaptiveWidth: true,
        nextArrow: <div style={{ display: 'block', color: 'black' }}>&#8594;</div>, // Custom next arrow
        prevArrow: <div style={{ display: 'block', color: 'black' }}>&#8592;</div>, // Custom prev arrow
    };

    return (
        <div className="slider-container">
            <Slider className="child-slider-container" {...settings}>
                <div className="slider-item" style={{ backgroundColor: "#FF5733", width: "39px", height: "63px", display: "inline-block" }}>
                    <h3>Block 1</h3>
                </div>
                <div className="slider-item" style={{ backgroundColor: "#33FF57" }}>
                    <h3>Block 2</h3>
                </div>
                <div className="slider-item" style={{ backgroundColor: "#3357FF" }}>
                    <h3>Block 3</h3>
                </div>
                <div className="slider-item" style={{ backgroundColor: "#FF33A6" }}>
                    <h3>Block 4</h3>
                </div>
                <div className="slider-item" style={{ backgroundColor: "#33FF57" }}>
                    <h3>Block 5</h3>
                </div>
                <div className="slider-item" style={{ backgroundColor: "#3357FF" }}>
                    <h3>Block 6</h3>
                </div>
                <div className="slider-item" style={{ backgroundColor: "#FF33A6" }}>
                    <h3>Block 7</h3>
                </div>
            </Slider>
        </div>
    );
};

export default SliderComponent;
