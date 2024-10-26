import React, { useState } from 'react';
import './slider.css';
import { useDispatch } from 'react-redux';
import { updateAnalyticsCriteria } from '../../redux/slice/analytics';

const SliderComponent = () => {
  const [sliderWidth, setSliderWidth] = useState('100%');
  const [showArrows, setShowArrows] = useState(true);
  const dispatch = useDispatch();

  function getWeekDaysFromDate(date) {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = [];

    let startDateWeek = 11111111111;
    let lastDateWeek = -11111111111;
    let month = 0;

    const currentDay = date.getDay();

    for (let i = 0; i < 7; i++) {
      const diff = i - currentDay;
      const day = new Date(date);
      day.setDate(date.getDate() + diff);

      if (day.getMonth() + 1 === new Date().getMonth() + 1) {
        week.push({
          dayName: weekDays[i],
          date: day.getDate(),
          Month: day.getMonth() + 1,
        });
        startDateWeek = Math.min(startDateWeek, day.getDate());
        lastDateWeek = Math.max(lastDateWeek, day.getDate());
      }
    }

    dispatch(
      updateAnalyticsCriteria({
        weekFirstDate: startDateWeek,
        weekLastDate: lastDateWeek,
        currentMonth: new Date().getMonth() + 1,
        currentYear: new Date().getFullYear(),
      })
    );

    return week;
  }

  const today = new Date();
  const week = getWeekDaysFromDate(today);

  return (
    <div className="slider-container" style={{ width: sliderWidth }}>
      <div className="week-grid">
        {week.map((day, index) => {
          if (day.date === new Date().getDate()) {
            return (
              <div
                key={index}
                style={{ backgroundColor: '#4566EC', color: 'white' }}
                className="week-card"
              >
                <p className="day-name" style={{ color: 'white' }}>
                  {day.dayName}
                </p>
                <p className="day-date" style={{ color: 'white' }}>
                  {day.date}
                </p>
                <span
                  style={{
                    width: '8px', // increased size
                    height: '8px',
                    backgroundColor: 'white',
                    borderRadius: '50%', // makes it a circle
                    display: 'inline-block', // ensures dimensions are applied
                    margin: '2px', // adds a bit of spacing around it
                  }}
                ></span>
              </div>
            );
          }

          return (
            <div key={index} className="week-card">
              <p className="day-name">{day.dayName}</p>
              <p className="day-date">{day.date}</p>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderComponent;
