import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import './slider.css';
import Dot from '../static/Ellipse 2.png'

const SliderComponent = () => {
    const [sliderWidth, setSliderWidth] = useState("100%");
    const [showArrows, setShowArrows] = useState(true);

    function getWeekDaysFromDate(date) {
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const week = [];

        // Get the day index (0 = Sunday, 6 = Saturday)
        const currentDay = date.getDay();

        // Loop through the weekdays, starting from Sunday
        for (let i = 0; i < 7; i++) {
            // Calculate the difference between the current day and each weekday
            const diff = i - currentDay;

            // Clone the original date and set it to the corresponding weekday
            const day = new Date(date);
            day.setDate(date.getDate() + diff);

            // Push the weekday name and its date (dd-mm-yyyy format)
            week.push({
                dayName: weekDays[i],
                date: day.getDate(),
                Month: day.getMonth() + 1
            });
        }

        return week;
    }

    // Usage example:
    const today = new Date(); // Input the current date
    const week = getWeekDaysFromDate(today);
    console.log(week);


    // Dynamically add CSS to hide/show slick arrows pseudo-elements based on the showArrows state
    function togglePseudoElementCSS(show) {
        const styleElement = document.getElementById("dynamic-slick-arrows");
        if (styleElement) {
            styleElement.innerHTML = `
                .slick-next:before, .slick-prev:before {
                    display: ${show ? 'block' : 'none'} !important;
                    color: black;
                }
            `;
        } else {
            const newStyleElement = document.createElement("style");
            newStyleElement.id = "dynamic-slick-arrows";
            newStyleElement.innerHTML = `
                .slick-next:before, .slick-prev:before {
                    display: ${show ? 'block' : 'none'} !important;
                    color: black;
                }
            `;
            document.head.appendChild(newStyleElement);
        }
    }

    // Check device width on initial render and window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 350) {
                setSliderWidth("80%");
                togglePseudoElementCSS(true);


            } else {
                setSliderWidth("100%");
                togglePseudoElementCSS(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            const styleElement = document.getElementById("dynamic-slick-arrows");
            if (styleElement) {
                styleElement.remove(); // Clean up the style element on unmount
            }
        };
    }, [showArrows]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        nextArrow: <div style={{ display: 'none' }}></div>, // Custom next arrow hidden
        prevArrow: <div style={{ display: 'none' }}></div>, // Custom prev arrow hidden
    };

    return (
        <div className="slider-container">
            <Slider className="child-slider-container" style={{ width: sliderWidth }} {...settings}>
                {

                    week.map((ele) => {
                        console.log(new Date().getDate(), ele.date)
                        if (new Date().getDate() == ele.date) {
                            return (
                                <div style={{ width: "39px", height: "63px", transform: "scale(3)", transformOrigin: "center" }} className="slider-item">
                                    <p>{ele.dayName}</p>
                                    <p>{ele.date}</p>
                                    <img
                                        src={Dot}
                                        alt="Right Image"
                                        style={{ position: "relative", left: "21px", top: "5px", width: "5px", height: "auto" }}
                                    />
                                </div>
                            )
                        } else {
                            return (
                                <div className="slider-item">
                                    <p>{ele.dayName}</p>
                                    <p>{ele.date}</p>
                                </div>
                            )
                        }

                    })
                }

            </Slider>
        </div>
    );
};

export default SliderComponent;
