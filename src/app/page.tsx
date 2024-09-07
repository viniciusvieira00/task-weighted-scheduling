"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { weightedIntervalScheduling, Task } from '../utils/utils';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const formatTime = (date: Date) => date.toLocaleTimeString('pt-BR', { hour12: false });

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [result, setResult] = useState<Task[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = () => {
    if (startTime && endTime) {
      if (endTime <= startTime) {
        setError("O horário de fim não pode ser antes ou igual ao horário de início.");
        return;
      }

      const newTask: Task = {
        start: startTime,
        end: endTime,
        weight: tasks.length + 1,
      };
      setTasks([...tasks, newTask]);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleSchedule = () => {
    const scheduledTasks = weightedIntervalScheduling(tasks);
    setResult(scheduledTasks);
    const total = scheduledTasks.reduce((sum, task) => sum + task.weight, 0);
    setTotalWeight(total);
  };

  const handleResetTasks = () => {
    setTasks([]);
    setResult([]);
    setTotalWeight(0);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Agendamento de Reuniões
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TimePicker
            label="Horário de Início"
            value={startTime}
            ampm={false}
            onChange={(newValue) => setStartTime(newValue)}
          />
          <TimePicker
            label="Horário de Fim"
            value={endTime}
            ampm={false}
            onChange={(newValue) => setEndTime(newValue)}
          />
          <Button variant="contained" onClick={handleAddTask} disabled={!startTime || !endTime}>
            Adicionar
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Tarefas Adicionadas</Typography>
          {tasks.map((task, index) => (
            <Typography key={index}>
              {`Tarefa ${task.weight}: Início - ${formatTime(task.start)} | Fim - ${formatTime(task.end)} | Peso - ${task.weight}`}
            </Typography>
          ))}
        </Box>

        <Button variant="contained" color="primary" onClick={handleSchedule} disabled={tasks.length === 0}>
          Concluir Agendamento
        </Button>

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
              <Button variant="outlined" onClick={handleResetTasks} sx={{ mt: 2 }}>
                Resetar Tarefas
              </Button>
            </Box>
          </>
        )}

        <Dialog open={!!error} onClose={handleCloseError}>
          <DialogTitle>Erro</DialogTitle>
          <DialogContent>{error}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Home;
