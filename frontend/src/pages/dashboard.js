import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar';
import Slider from '../components/slider/slider';
import Progress from '../components/boxes/boxes';
import WorkProgress from '../components/progress';
import TaskList from '../components/taskList/taskList';
import AddIcon from '../static/add.png';
import AddTask from '../components/addtask/addtask';
import EditTask from '../components/edittask/edittask';
import { useSelector, useDispatch } from 'react-redux';
import { close } from '../redux/slice/editslice';
import DateCalc from '../utils/timepass.js'
import SearchTaskList from '../components/searchModal/searchModal';
import { updateAnalyticsCriteria } from '../redux/slice/analytics.js';


function DashBoard() {

  const [isAddNewTaskOpen, SetisAddNewTaskOpen] = useState(false);
  const isEditTaskOpen = useSelector((state) => state.editTask.edittask);
  const currentMonths = useSelector((state) => state.analyticTask.currentMonth);
  const currentYears = useSelector((state) => state.analyticTask.currentYear);
  const currentWeeks = useSelector((state) => state.analyticTask.currentWeek);

  // State to store selected values
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [totalNoOfWeeks, setTotalNoOfWeeks] = useState('')

  useEffect(() => {
    const noOfweeks = DateCalc.calculateWeeksInMonth(new Date().getFullYear(), new Date().getMonth());
    setTotalNoOfWeeks(noOfweeks)
    setSelectedMonth(currentMonths ?? new Date().getMonth());
    setSelectedYear(currentYears ?? new Date().getFullYear())
  }, []);

  useEffect(() => {
    if (selectedMonth !== '' && selectedYear !== '') {
      console.log("CHange in week console runs")
      const noOfweeks = DateCalc.calculateWeeksInMonth(selectedYear, selectedMonth);
      setTotalNoOfWeeks(noOfweeks)
      setSelectedWeek(currentWeeks ?? 1);
      runner(1);
    }

  }, [selectedMonth, selectedYear])

  const runner = (weekNo) => {
    const starty = DateCalc.calculateDate(selectedYear, selectedMonth, weekNo)
    console.log("starty", { starty, selectedYear: Number(selectedYear), selectedWeek, selectedMonth })
    dispatch(updateAnalyticsCriteria({
      weekFirstDate: starty.startDate,
      weekLastDate: starty.enddate,
      currentMonth: Number(selectedMonth),
      currentYear: Number(selectedYear),
      currentWeek: Number(weekNo)
    }))
  }
  useEffect(() => {

    if (selectedWeek !== '') {
      console.log("Week is changed")
      runner(selectedWeek);
    }

  }, [selectedWeek])



  // Month options
  const months = Array.from({ length: 12 }, (v, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));

  // Year options (you can adjust the range as needed)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (v, i) => ({
    value: currentYear + i,
    label: currentYear + i,
  }));

  // Week options (1-4, depending on how you define weeks)
  const weeks = Array.from({ length: totalNoOfWeeks }, (v, i) => ({
    value: i + 1,
    label: `Week ${i + 1}`,
  }));

  console.log({ isEditTaskOpen })

  const dispatch = useDispatch();

  return (
    <div style={{ padding: '10px' }}>

      {/* Month, Year, and Week Selectors */}
      <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: '20px' }}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ padding: '5px', borderRadius: '5px' }}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ padding: '5px', borderRadius: '5px' }}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>

        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          style={{ padding: '5px', borderRadius: '5px' }}
        >
          <option value="">Select Week</option>
          {weeks.map((week) => (
            <option key={week.value} value={week.value}>
              {week.label}
            </option>
          ))}
        </select>
      </div>

      <SearchBar />
      {/* <TaskSearchList /> */}
      <SearchTaskList />
      <Slider />

      <br />
      <Progress />
      <br />
      <WorkProgress />
      <br />
      <TaskList />
      <br />


      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '100%',
            backgroundColor: '#4566EC',
          }}
        >
          <img
            src={AddIcon}
            alt="Right Image"
            onClick={() => {
              SetisAddNewTaskOpen(true);
            }}
            style={{
              position: 'relative',
              left: '50%',
              top: '50%',
              width: '19px',
              height: '19px',
              transform: 'translate(-50%,-50%)',
            }}
          />
        </div>
      </div>
      <AddTask
        isOpen={isAddNewTaskOpen}
        onClose={() => SetisAddNewTaskOpen(false)}
      />
      <EditTask isOpen={isEditTaskOpen} onClose={() => dispatch(close())} />
    </div>
  );
}

export default DashBoard;
