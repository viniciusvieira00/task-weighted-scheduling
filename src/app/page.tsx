"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { weightedIntervalScheduling, Task } from '../utils/utils';
import TaskList from '../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [result, setResult] = useState<Task[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [manualWeight, setManualWeight] = useState<number | null>(null);
  const [isManualWeightMode, setIsManualWeightMode] = useState<boolean>(false); // Modo manual
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = () => {
    if (startTime && endTime) {
      if (endTime <= startTime) {
        setError("O horário de fim não pode ser antes ou igual ao horário de início.");
        return;
      }

      const weight = isManualWeightMode && manualWeight ? manualWeight : tasks.length + 1;

      const newTask: Task = {
        start: startTime,
        end: endTime,
        weight,
      };
      setTasks([...tasks, newTask]);
      setStartTime(null);
      setEndTime(null);
      setManualWeight(null); 
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

        <Button
          variant="outlined"
          onClick={() => setIsManualWeightMode(!isManualWeightMode)}
          sx={{ mb: 2 }}
        >
          {isManualWeightMode ? "Usar Pesos Automáticos" : "Inserir Pesos Manualmente"}
        </Button>

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
          
          {isManualWeightMode && (
            <TextField
              label="Peso"
              type="number"
              value={manualWeight ?? ""}
              onChange={(e) => setManualWeight(Number(e.target.value))}
            />
          )}

          <Button variant="contained" onClick={handleAddTask} disabled={!startTime || !endTime || (isManualWeightMode && !manualWeight)}>
            Adicionar
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={handleSchedule} disabled={tasks.length === 0}>
          Concluir Agendamento
        </Button>

        <TaskList tasks={tasks} result={result} totalWeight={totalWeight} onReset={handleResetTasks} />

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
