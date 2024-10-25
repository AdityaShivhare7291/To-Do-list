import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { TextField, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddTask = ({ isOpen, onClose }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [taskDate, setTaskDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Add New Task</h2>
          <FontAwesomeIcon
            icon={faTimes}
            style={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        <div style={styles.centerlization}>
          <form>
            <div style={styles.inputGroup}>
              <label style={styles.labelstyling}>Task title:</label>
              <input type="text" required style={styles.input} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.labelstyling}>Set Time:</label>

              <div style={styles.timeFlex}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['MobileTimePicker']}>
                      <DemoItem>
                        <MobileTimePicker
                          label={'Start Time'}
                          defaultValue={dayjs(new Date())}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AccessTimeIcon />
                                    </InputAdornment>
                                  ),
                                },
                              }}
                            />
                          )}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['MobileTimePicker']}>
                      <DemoItem>
                        <MobileTimePicker
                          label={'End Time'}
                          defaultValue={dayjs(new Date())}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            {/* Task Date */}
            <div style={styles.inputGroup}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileTimePicker']}>
                  <DemoItem>
                    <label style={styles.labelstyling}>Set Date</label>
                    <DatePicker />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>

            {/* Description Field */}
            <div style={styles.inputGroup}>
              <label style={styles.labelstyling}>Description:</label>
              <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4" // Fix the rows to 4
                placeholder="Enter task details..."
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  resize: 'vertical', // Allows vertical resize only
                  outline: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles for modal
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    zIndex: 1000,
  },
  labelstyling: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#717171',
  },
  centerlization: {
    width: '95%',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    color: 'red',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    height: '27px',
    padding: '6px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  setTime: {
    display: 'inline-block',
    height: '27px',
    padding: '6px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '10px',
  },
  timeFlex: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4566EC',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default AddTask;
