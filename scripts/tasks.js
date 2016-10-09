let tasks = {};

function addTask(name, func) {
  tasks[name] = func;
}

function runTask(name) {
  const task = tasks[name];
  if(typeof task === 'function') {
    console.log(`Running ${name}...`);
    task();
  } else {
    console.log(`No task named ${name}`);
  }
}


/**
 * Definer tasks her!
 */


let [,,...tasksToRun] = process.argv;

if(tasksToRun.length === 0) {
  tasksToRun = Object.keys(tasks);
}

tasksToRun.forEach(taskName => runTask(taskName));
