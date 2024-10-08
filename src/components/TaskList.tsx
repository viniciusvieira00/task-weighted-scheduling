import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../utils/utils';

interface TaskListProps {
  tasks: Task[];
  result: Task[];
  discardedTasks: Task[];
  totalWeight: number;
  onReset: () => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  isManualWeightMode: boolean;
}

const formatTime = (date: Date) => date.toLocaleTimeString('pt-BR', { hour12: false });

const TaskList: React.FC<TaskListProps> = ({ tasks, result, discardedTasks, totalWeight, onReset, onDelete, onEdit, isManualWeightMode }) => {

  const getTaskIndex = (task: Task) => tasks.findIndex(t => t.start === task.start && t.end === task.end && t.weight === task.weight) + 1;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Tarefas Adicionadas</Typography>
        {tasks.map((task, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography>
              {`${index + 1}° Tarefa: Início - ${formatTime(task.start)} | Fim - ${formatTime(task.end)} | Peso - ${task.weight}`}
            </Typography>
            <Box>
              <IconButton onClick={() => onEdit(index)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton color='error' onClick={() => onDelete(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {result.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Tarefas Agendadas</Typography>
            <Timeline>
              {result.map((task, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index < result.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    {`Tarefa ${getTaskIndex(task)}: Início - ${formatTime(task.start)} | Fim - ${formatTime(task.end)} | Peso - ${task.weight}`}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">{`Peso Total: ${totalWeight}`}</Typography>
            <Button variant="outlined" onClick={onReset} sx={{ mt: 2 }}>
              Resetar Tarefas
            </Button>
          </Box>
        </>
      )}

      {discardedTasks.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="error">Tarefas Descartadas</Typography>
            <Timeline>
              {discardedTasks.map((task, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="error" />
                    {index < discardedTasks.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    {`Tarefa ${getTaskIndex(task)}: Início - ${formatTime(task.start)} | Fim - ${formatTime(task.end)} | Peso - ${task.weight}`}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TaskList;
