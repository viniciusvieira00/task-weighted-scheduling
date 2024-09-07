export interface Task {
  start: Date;
  end: Date;
  weight: number; 
}


const findLastNonConflictingTask = (tasks: Task[], i: number): number => {
  for (let j = i - 1; j >= 0; j--) {
    if (tasks[j].end <= tasks[i].start) {
      return j;
    }
  }
  return -1;
};


export const weightedIntervalScheduling = (tasks: Task[]): Task[] => {

  tasks.sort((a, b) => a.end.getTime() - b.end.getTime());

  const n = tasks.length;
  const dp = new Array(n).fill(0);
  const selectedTasks: number[] = new Array(n).fill(-1);

  dp[0] = tasks[0].weight;


  for (let i = 1; i < n; i++) {

    const include = tasks[i].weight;
    const l = findLastNonConflictingTask(tasks, i);
    if (l !== -1) {
      dp[i] = Math.max(dp[i - 1], include + dp[l]);
    } else {
      dp[i] = Math.max(dp[i - 1], include);
    }
  }
 
  const result: Task[] = [];
  let i = n - 1;
  while (i >= 0) {
    if (i === 0 || dp[i] !== dp[i - 1]) {
      result.push(tasks[i]);
      i = findLastNonConflictingTask(tasks, i);
    } else {
      i--;
    }
  }

  return result.reverse(); 
};
