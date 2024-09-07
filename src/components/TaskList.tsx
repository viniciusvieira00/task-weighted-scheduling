// components/TaskList.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Task } from '../utils/utils';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

interface TaskListProps {
  tasks: Task[];
  result: Task[];
  totalWeight: number;
  onReset: () => void;
}
const formatTime = (date: Date) => date.toLocaleTimeString('pt-BR', { hour12: false });

const TaskList: React.FC<TaskListProps> = ({ tasks, result, totalWeight, onReset }) => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Tarefas Adicionadas</Typography>
        {tasks.map((task, index) => (
          <Typography key={index}>
            {`Tarefa ${task.weight}: Início - ${formatTime(task.start)} | Fim - ${formatTime(task.end)} | Peso - ${task.weight}`}
          </Typography>
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
                    {`Tarefa ${task.weight}: Início - ${formatTime(task.start)} | Fim - ${formatTime(task.end)} | Peso - ${task.weight}`}
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
    </Box>
  );
};

export default TaskList;
