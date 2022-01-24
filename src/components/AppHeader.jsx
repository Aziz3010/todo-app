import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button, { SelectButton } from '../components/Button';
import { updateFilterStatus } from '../slices/todoSlice';
import style_head from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useSelector((state) => state.todo.filterStatus)
    const dispatch = useDispatch();

    const updateFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value))
    }

    return (
        <div className={style_head.appHeader}>
            <Button onClick={() => { setModalOpen(true) }} variant='primary'>Add Task</Button>
            <SelectButton id='Status' value={filterStatus} onChange={updateFilter} >
                <option value='all'>All</option>
                <option value='Completed'>Completed</option>
                <option value='Incomplete'>Incomplete</option>
            </SelectButton>
            <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}

export default AppHeader;
