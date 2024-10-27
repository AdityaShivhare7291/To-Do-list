import React, { useEffect, useState } from 'react';
import './slider.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnalyticsCriteria } from '../../redux/slice/analytics';

const SliderComponent = () => {
  const [sliderWidth, setSliderWidth] = useState('100%');
  const [weeks, setWeek] = useState(null);
  const dispatch = useDispatch();

  const startDateWeek = useSelector(
    (state) => state.analyticTask.weekFirstDate
  );
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear);

  function getWeekDaysFromDate(startDate, endDate) {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = [];

    const currentDay = startDate.getDay();
    let count = 0;
    console.log("today's date", {
      startDate,
      endDate,
      iter1: startDate.getDate() + count,
      iter2: endDate.getDate(),
    });
    for (let i = currentDay; i < 7; i++) {
      if (startDate.getDate() + count > endDate.getDate()) continue;

      week.push({
        dayName: weekDays[i],
        date: startDate.getDate() + count,
        Month: startDate.getMonth() + 1,
        year: startDate.getFullYear(),
      });

      count++;
    }

    return week;
  }

  useEffect(() => {
    console.log('week days generator runs ', { startDateWeek, lastDateWeek });
    const today = new Date(currentYear, currentMonth - 1, startDateWeek);
    const endToday = new Date(currentYear, currentMonth - 1, lastDateWeek);
    const week = getWeekDaysFromDate(today, endToday);
    console.log('week generator', { week, currentYear });
    setWeek(week);
  }, [startDateWeek, lastDateWeek, currentMonth, currentYear]);

  return (
    <div className="slider-container" style={{ width: sliderWidth }}>
      <div className="week-grid">
        {weeks?.map((day, index) => {
          if (
            day.date === new Date().getDate() &&
            day.Month === new Date().getMonth() &&
            day.year === new Date().getFullYear()
          ) {
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
