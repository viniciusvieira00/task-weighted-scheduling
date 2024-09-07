# Agendamento de Reuniões com Weighted Interval Scheduling

Este projeto é uma aplicação interativa que permite aos usuários adicionar intervalos de horários de reuniões, verificar a compatibilidade entre os horários e agendar reuniões de forma otimizada usando o algoritmo de *Weighted Interval Scheduling*. Desenvolvida utilizando **Next.js**, **TypeScript** e **Material-UI**, a aplicação possibilita adicionar múltiplas tarefas, verificar conflitos de horário, e visualizar a linha do tempo das reuniões agendadas com base no peso atribuído a cada tarefa.

## Funcionalidades

- Adicionar intervalos de horários para tarefas (reuniões) com campos de início e fim.
- Verificação de compatibilidade entre horários (impede fim anterior ao início).
- Agendamento otimizado utilizando o algoritmo *Weighted Interval Scheduling*.
- Exibição visual dos intervalos de reuniões agendadas utilizando uma linha do tempo (*Timeline*).
- Botão para resetar as tarefas e começar novamente.
- Interface moderna e responsiva utilizando **Material-UI**.

## Algoritmo de Weighted Interval Scheduling

O algoritmo de *Weighted Interval Scheduling* é usado para selecionar as tarefas que maximizam o valor total (peso) de um conjunto de tarefas sem sobreposição de horários. Cada tarefa é atribuída um peso sequencial de acordo com sua ordem de inserção.

### Funcionamento do Algoritmo

1. **Ordenação por horário de término**: As tarefas são ordenadas pelo horário de término, de modo a otimizar o agendamento sem sobreposição.
2. **Resolução Recursiva**: Para cada tarefa, decide-se recursivamente se ela deve ser incluída no agendamento com base na compatibilidade com as outras tarefas.
3. **Combinação de Tarefas**: O subconjunto de tarefas sem sobreposição que maximiza o peso total é selecionado e exibido ao usuário.

### Exibição do Agendamento

O agendamento das tarefas é exibido através de uma linha do tempo interativa utilizando o componente *Timeline* do **Material-UI**, mostrando o horário de início, o horário de fim, e o peso atribuído a cada tarefa. Além disso, o peso total das tarefas agendadas é exibido ao final.

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** na versão mais atual (22.4.1 ou superior) instalado
- **npm** ou **yarn** instalado

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone git@github.com:viniciusvieira00/task-weighted-scheduling.git
   cd task-weighted-scheduling
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Link de Deploy

Você também pode acessar a aplicação diretamente no link de deploy:
[task-weighted-scheduling.vercel.app](https://task-weighted-scheduling.vercel.app/)

## Estrutura do Projeto

- **`app/page.tsx`**: Página principal que exibe a interface para adicionar e agendar reuniões.
- **`utils/utils.ts`**: Algoritmo de *Weighted Interval Scheduling* e funções auxiliares.
- **`components/TaskList.tsx`**: Componente para exibir a lista de tarefas e a linha do tempo.

## Vídeo

<!-- - [Baixe o Vídeo](https://github.com/viniciusvieira00/hanoi-tower/tree/main/readme_data/bandicam-2024-08-19-23-31-34-104.mp4) -->

## Contribuidores do Projeto

- [Vinicius Vieira](https://github.com/viniciusvieira00), Matrícula: 190118059
- [Luciano Machado](https://github.com/Hierophylax), Matrícula: 180126130
