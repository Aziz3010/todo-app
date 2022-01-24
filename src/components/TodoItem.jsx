import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import toast from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';
import { motion } from 'framer-motion';

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    }
}


function TodoItem({ todo }) {

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success('Task Deleted');
    }

    const [updateMadalType, setUpdateMadalType] = useState(false)
    const handleEdit = () => {
        setUpdateMadalType(true);
    }

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (todo.status === 'Completed') {
            setChecked(true);
        } else {
            setChecked(false);
        }

    }, [todo.status]);

    const handleChecked = () => {
        setChecked(!checked);
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'Incomplete' : 'Completed' ,
        }))
    }

    return (
        <>
            <motion.div className={styles.item} 
                    variants={child}
            >
                <div className={styles.todoDetails}>

                    <CheckButton checked={checked} handleChecked={handleChecked} />

                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, todo.status === 'Completed' && styles["todoText--completed"]])}>{todo.title}</p>
                        <p className={styles.time}>{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
                    </div>

                </div>
                <div className={styles.todoActions}>

                    <div
                        className={styles.icon}
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        role="button"
                        tabIndex={0}
                    >
                        <MdDelete />
                    </div>

                    <div
                        className={styles.icon}
                        onClick={handleEdit}
                        onKeyDown={handleEdit}
                        role="button"
                        tabIndex={0}
                    >
                        <MdEdit />
                    </div>

                </div>
            </motion.div>

            <TodoModal type='update' todo={todo} modalOpen={updateMadalType} setModalOpen={setUpdateMadalType} />
        </>
    );
}

export default TodoItem;
