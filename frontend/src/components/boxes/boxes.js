import React, { useEffect } from 'react';
import wave1 from '../../static/CheckBox.png';
import './boxes.css';
import { updateAnalytics } from '../../redux/slice/analytics';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Progress = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskList.tasks);
  const startDateWeek = useSelector(
    (state) => state.analyticTask.weekFirstDate
  );
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear);

  const [counts, setCounts] = useState({
    completed: 0,
    progress: 0,
    open: 0,
    closed: 0,
  });

  let completed = 0,
    progress = 0,
    open = 0,
    closed = 0;

  useEffect(() => {
    tasks.forEach((element) => {
      console.log('month is ', {
        currentMonth,
        hh: new Date(element.date).getMonth(),
      });
      console.log('current year', {
        currentYear,
        yy: new Date(element.date).getFullYear(),
      });
      console.log('date week', {
        startDateWeek,
        sdqw: new Date(element.date).getDate(),
      });
      console.log('*'.repeat(80));
      if (
        currentMonth === new Date(element.date).getMonth() + 1 &&
        currentYear === new Date(element.date).getFullYear() &&
        startDateWeek <= new Date(element.date).getDate() &&
        lastDateWeek >= new Date(element.date).getDate()
      ) {
        console.log('tasks', { tasks, element });
        if (element.status === 'progress') {
          progress++;
        } else if (element.status === 'open') {
          open++;
        } else if (element.status === 'closed') {
          closed++;
        } else {
          completed++;
        }
      }
    });

    setCounts({ completed, progress, open, closed });
  }, [tasks, startDateWeek, lastDateWeek, currentMonth, currentYear]);

  useEffect(() => {
    console.log('Analyticcs is passed');
    if (!(counts.completed + counts.progress + counts.open + counts.closed)) {
      dispatch(updateAnalytics({ progress: 0 }));
    } else {
      const ans =
        (counts.completed /
          (counts.completed + counts.progress + counts.open + counts.closed)) *
        100;
      dispatch(updateAnalytics({ progress: ans }));
    }
  }, [counts]);

  return (
    <div className="progress-container">
      <div
        className="progress-task-completed-container"
        style={{ background: '#EFF2FF' }}
      >
        <div>
          <img src={wave1} alt="Image 1" />
        </div>
        <div>
          <p>Task Complete</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h3 style={{ paddingRight: '3px' }}>{counts.completed}</h3>
            <p style={{ position: 'relative', top: '5px', left: '0px' }}>
              This week
            </p>
          </div>
        </div>
      </div>
      <div
        className="progress-task-completed-container"
        style={{ background: '#FFB1B5' }}
      >
        <div>
          <img src={wave1} alt="Image 1" />
        </div>
        <div>
          <p>Task Pending</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h3 style={{ paddingRight: '3px' }}>
              {counts.open + counts.progress + counts.closed}
            </h3>
            <p style={{ position: 'relative', top: '5px', left: '0px' }}>
              This week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
