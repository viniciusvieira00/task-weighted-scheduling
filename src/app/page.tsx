"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { weightedIntervalScheduling, Task } from '../utils/utils';
import TaskList from '../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [manualWeight, setManualWeight] = useState<number | null>(null);
  const [isManualWeightMode, setIsManualWeightMode] = useState<boolean>(false); 
  const [result, setResult] = useState<Task[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<number | null>(null); 
  const [error, setError] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleAddTask = () => {
    if (startTime && endTime) {
      if (endTime <= startTime) {
        setError("O horário de fim não pode ser antes ou igual ao horário de início.");
        return;
      }

      const weight = isManualWeightMode && manualWeight !== null
        ? manualWeight 
        : (isEditing !== null ? tasks[isEditing].weight : tasks.length + 1); 

      const newTask: Task = {
        start: startTime,
        end: endTime,
        weight,
      };

      if (isEditing !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[isEditing] = newTask;
        setTasks(updatedTasks);
        setIsEditing(null); 
        setSnackbarMessage("Tarefa editada com sucesso!");
      } else {
        setTasks([...tasks, newTask]);
        setSnackbarMessage("Tarefa adicionada com sucesso!");
      }

      setSnackbarOpen(true); 

      setStartTime(null);
      setEndTime(null);
      setManualWeight(null); 
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setSnackbarMessage("Tarefa removida com sucesso!");
    setSnackbarOpen(true); 
  };

  const handleEditTask = (index: number) => {
    const taskToEdit = tasks[index];
    setStartTime(taskToEdit.start);
    setEndTime(taskToEdit.end);
    setManualWeight(isManualWeightMode ? taskToEdit.weight : null); 
    setIsEditing(index); 
  };

  const handleSchedule = () => {
    const scheduledTasks = weightedIntervalScheduling(tasks);
    setResult(scheduledTasks);
    const total = scheduledTasks.reduce((sum, task) => sum + task.weight, 0);
    setTotalWeight(total);
    setSnackbarMessage("Agendamento concluído com sucesso!");
    setSnackbarOpen(true); 
  };

  const handleResetTasks = () => {
    setTasks([]);
    setResult([]);
    setTotalWeight(0);
    setSnackbarMessage("Todas as tarefas foram resetadas.");
    setSnackbarOpen(true); 
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#f7f7f7',
          borderRadius: 2,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#333' }}>
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

          <Button
            variant="contained"
            onClick={handleAddTask}
            disabled={!startTime || !endTime || (isManualWeightMode && !manualWeight)}
            sx={{ alignSelf: 'center' }}
          >
            {isEditing !== null ? "Salvar Alterações" : "Adicionar"}
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSchedule}
          disabled={tasks.length === 0}
          sx={{ marginBottom: 2 }}
        >
          Concluir Agendamento
        </Button>

        <TaskList
          tasks={tasks}
          result={result}
          totalWeight={totalWeight}
          onReset={handleResetTasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isManualWeightMode={isManualWeightMode}
        />

        <Dialog open={!!error} onClose={handleCloseError}>
          <DialogTitle>Erro</DialogTitle>
          <DialogContent>{error}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError}>Fechar</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default Home;
