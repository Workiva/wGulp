## Developing (make wGulp better!)

Contributions are highly encouraged! If you have some code for your gulp setup that you think would benefit other project, consider making a pull request.

#### Tasks
Tasks in wGulp should only be added for functionality that won't need additional configuration by the consumer. If it could, consider making it a subtask.

Some things don't fit the bill for a subtask, and in this case it is okay to make it a task. The `watch` tasks are a good example of this.

It is also acceptable to add convenience tasks that run other tasks to provide further "happy defaults". Most of these are located in `./tasks/defaults.js`.

Tasks should be located in the `./tasks/` directory. Simple tasks that only run other tasks/subtasks can be added to `./tasks/defaults.js`.

#### Subtasks
Any "task" functionality that consumers would want to be able to customize should be made into a subtask. Subtasks are located in `./subtasks/`. Each subtask needs its own file. A subtask file should export a double-curried function, look at existing subtasks as an example.

Once you have created a subtask, you will need to require it in `index.js`.


### Run tests

Run the wGulp tests using the command line

Step 1: install everything including dev dependencies

    npm install

Step 2: run tests

    npm test
