const tasks = {
  tasks: [
    {
      test: "Grocery shopping",
      completed: true,
    },
    {
      text: "Clean yard",
      completed: false,
    },
    {
      test: "Film course",
      completed: false,
    },
  ],
  getTasksToDo() {
    const incompletedTasks = this.tasks.filter(
      (task) => task.completed === false
    );
    return incompletedTasks;
  },
};

console.log("Incompleted tasks: ", tasks.getTasksToDo());
