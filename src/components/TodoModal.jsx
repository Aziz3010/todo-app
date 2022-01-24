import React, { useEffect, useState } from 'react';
import Style from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: .1,
            type: 'spring',
            damping: '25',
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(.9)',
        opacity: 0,
    }
}


function TodoModal({ type, modalOpen, setModalOpen, todo }) {

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('Incomplete');
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('Incomplete');
        }

    }, [type, todo, modalOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && status) {
            if (type === 'add') {
                dispatch(addTodo({
                    id: uuid(),
                    title: title,
                    status: status,
                    time: new Date().toLocaleString(),
                }))
                toast.success('Task Added Successfully');
            } else if (type === 'update') {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({
                        ...todo,
                        title: title,
                        status: status,
                    }))
                    toast.success('Task Updated Successfully');
                } else {
                    toast.error("No Changes Made");
                    return;
                }
            }
            setModalOpen(false);
        } else {
            toast.error("Title shouldn't be empty");
        }
    }

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div className={Style.wrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className={Style.container}
                        variants={dropIn}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        <motion.div className={Style.closeButton}
                            initial={{ top: 40, opacity: 0 }}
                            animate={{ top: -10, opacity: 1 }}
                            exit={{ top: 40, opacity: 0 }}
                        >
                            <MdOutlineClose
                                onClick={() => { setModalOpen(false) }}
                                onKeyDown={() => { setModalOpen(false) }}
                                tabIndex={0}
                                tole="button"
                            >
                            </MdOutlineClose>
                        </motion.div>

                        <form className={Style.form} onSubmit={(e) => handleSubmit(e)} >

                            <h1 className={Style.formTitle}>
                                {type === 'update' ? 'Update' : 'Add'} Task
                            </h1>

                            <label htmlFor='title'>
                                Title
                                <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>

                            <label htmlFor='status'>
                                Status
                                <select value={status} onChange={(e) => setStatus(e.target.value)} name="status" id="status">
                                    <option value='Incomplete'>Incomplete</option>
                                    <option value='Completed'>Completed</option>
                                </select>
                            </label>

                            <div className={Style.buttonContainer}>
                                <Button variant='primary' type='submit'>
                                    {type === 'update' ? 'Update' : 'Add'} Task
                                </Button>

                                <Button
                                    onClick={() => { setModalOpen(false) }}
                                    onKeyDown={() => { setModalOpen(false) }}
                                    variant='secondary' type='button'
                                >
                                    Cancle
                                </Button>

                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TodoModal;
