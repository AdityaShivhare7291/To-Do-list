import React, { useEffect, useState } from 'react';
import './slider.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnalyticsCriteria } from '../../redux/slice/analytics';

const SliderComponent = () => {
  const [sliderWidth, setSliderWidth] = useState('100%');
  const [weeks, setWeek] = useState(null);
  const dispatch = useDispatch();

  const startDateWeek = useSelector((state) => state.analyticTask.weekFirstDate);
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear)

  function getWeekDaysFromDate(date, endDate) {
    console.log("today's date", date)
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = [];

    let startDateWeeks = 11111111111;
    let lastDateWeeks = -11111111111;


    const currentDay = date.getDay();

    for (let i = 0; i < 7; i++) {
      const diff = i - currentDay;
      const day = new Date(date);
      day.setDate(date.getDate() + diff);
      console.log({ endDate, startDate: date.getDate(), checkDate: day.getDate() })
      if (day.getDate() <= endDate && date.getDate() <= day.getDate()) {
        week.push({
          dayName: weekDays[i],
          date: day.getDate(),
          Month: day.getMonth() + 1,
        });
        startDateWeeks = Math.min(startDateWeek, day.getDate());
        lastDateWeeks = Math.max(lastDateWeek, day.getDate());
      }
    }



    return week;
  }

  useEffect(() => {
    console.log("week days generator runs ", { startDateWeek, lastDateWeek })
    const today = new Date(currentYear, currentMonth - 1, startDateWeek);

    const week = getWeekDaysFromDate(today, lastDateWeek);
    console.log("week generator", { week })
    setWeek(week)
  }, [startDateWeek, lastDateWeek, currentMonth, currentYear])


  return (
    <div className="slider-container" style={{ width: sliderWidth }}>
      <div className="week-grid">
        {weeks?.map((day, index) => {
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
