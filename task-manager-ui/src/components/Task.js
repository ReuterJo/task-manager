import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Task({task, taskId, parentId, tasksLock, onUpdateTasksLock, onUpdateActiveTaskId, onComplete, onCollapse, onDelete, onUpdateFormText, onUpdateFormState}) {
    let taskOptions;
    let showSubtasks;

    // Show tasks options enabled if tasks are not locked
    taskOptions = (
        <>
            <IconButton 
                onClick={() => {
                    onUpdateTasksLock(true);
                    onUpdateFormText(task.text);
                    onUpdateActiveTaskId(taskId);
                    onUpdateFormState('Edit Task');
            }}>
                <EditIcon />
            </IconButton>
            <IconButton 
                onClick={() => {
                    onUpdateTasksLock(true);
                    onUpdateFormText('');
                    onUpdateActiveTaskId(taskId);
                    onUpdateFormState('Add Subtask');
            }}>
                <AddIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(taskId, parentId)}>
                <DeleteIcon />
            </IconButton>            
        </>
    );

    if (task.childIds.length > 0 && task.childCollapsed) {
        showSubtasks = (
            <IconButton
                onClick={() => {
                    onCollapse(taskId, {
                        ...task,
                        childCollapsed: false,
                    });
                }}>
                <ArrowDropDownIcon />
            </IconButton>
        );
    }
    
    if (task.childIds.length > 0 && !task.childCollapsed) {
        showSubtasks = (
            <IconButton
                onClick={() => {
                    onCollapse(taskId, {
                        ...task,
                        childCollapsed: true,
                    });
                }}>
                <ArrowDropUpIcon />
            </IconButton>
        );
    }
    
    // Otherwise show task options disabled
    if (tasksLock) {
        taskOptions = (
            <>
                <IconButton disabled>
                    <EditIcon />
                </IconButton>
                <IconButton disabled>
                    <AddIcon />
                </IconButton>
                <IconButton disabled>
                    <DeleteIcon />
                </IconButton>
            </>
        );

        if (task.childIds.length > 0 && task.childCollapsed) {
            showSubtasks = (
                <IconButton disabled>
                    <ArrowDropDownIcon />
                </IconButton>
            );
        }

        if (task.childIds.length > 0 && !task.childCollapsed) {
            showSubtasks = (
                <IconButton disabled>
                    <ArrowDropUpIcon />
                </IconButton>
            );
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <label>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Checkbox 
                            type="checkbox"
                            checked={task.done}
                            onChange={(e) => {
                                onComplete(taskId, {
                                    ...task,
                                    done: e.target.checked,
                                });
                            }}
                        />
                        {task.text}
                    </Grid>
                    <Grid item xs={4}>
                        {taskOptions}
                        {showSubtasks}
                    </Grid>
                </Grid>
            </label>
        </Box>
    );
}