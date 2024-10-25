import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Trash from '../../static/trash-2.png'
import './taskbar.css'

const TaskBar = ({ task }) => {
    console.log({ task })
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            <div className='task-checkbox'>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <div className="task-title">
                {task}
            </div>
            <div className='task-icons'>
                <img
                    src={Trash}
                    alt="Right Image"
                    onClick={() => { console.log("Clicked On Trash") }}
                    style={{ position: "relative", left: "21px", top: "5px", width: "5px", height: "auto" }}
                />
            </div>
        </div>
    );
}

export default TaskBar;