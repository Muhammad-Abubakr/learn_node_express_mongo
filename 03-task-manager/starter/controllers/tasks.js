const TaskModel = require('../models/task');
const asyncWrapper = require('../middleware/async');


/* Get All Tasks */
// const getAllTasks = async (req, res) => {

//     try {
//         const allTasks = await TaskModel.find();

//         res.status(200).send({ status: 'success', tasks: allTasks });
//     } catch (err) {

//         res.status(500).send({ status: 'error', msg: err })
//     }
// }


const getAllTasks = asyncWrapper(
    async (req, res) => {

        const allTasks = await TaskModel.find();
        res.status(200).send({ status: 'success', tasks: allTasks });
    }
)


/* Create Task */
const createTask = async (req, res) => {
    const name = req.body.name;

    /*
        const newTask = new TaskModel({ name: name, completed: false, });
        newTask.save((err) => {
            console.log(err);
    
            res.status(500).send("There was an error on the server. The request could not be completed.")
        });
    */

    // await TaskModel.create({ name: name, completed: false }, (err, newTask) => {
    await TaskModel.create({ name: name }, (err, newTask) => {

        if (err) {

            return res.status(500).send({ status: 'error', msg: err })
        }
        res.status(201).send({ status: 'created', data: newTask });
    })

}

/* Get Single Task */
const getTask = async (req, res) => {
    const { id: taskID } = req.params;

    try {
        const task = await TaskModel.findById(taskID);
        // const task = await TaskModel.findOne({ _id: task_id });

        // if task is null, then that means that no task with the specified id is found
        if (!task) {
            return res.status(404).send({ status: 'failure', msg: `No Task with the specified id: ${taskID} found!` });
        }

        res.status(200).send({ status: 'success', task });

    } catch (error) {

        res.status(500).send({ status: 'error', msg: error })
    }

}

/* Update Task / Patch REQ */
const updateTask = async (req, res) => {
    const { id: taskID } = req.params;

    try {
        /* No input validators and the old object is returned by default */
        // const result = await TaskModel.findByIdAndUpdate(id, req.body);

        /* with input validators run and new/updated object return */
        // const result = await TaskModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        const result = await TaskModel.findByIdAndUpdate(taskID, { name: req.body.name, completed: req.body.completed }, { new: true, runValidators: true });

        // Resource not found
        if (!result) {
            return res.status(404).send(`No Task with the specified ID: ${taskID} found!`)
        }

        res.status(200).send({ status: 'success', task: result });
    } catch (err) {

        if (err.name === 'ValidationError') {

            // Bad Request
            return res.status(400).send({ status: 'error', msg: err });
        }

        // Internal Server Error
        res.status(500).send({ status: 'error', msg: err });
    }

}


/* Edit Task (PUT) / Replace / Overwrite */
const editTask = async (req, res) => {
    const { id: taskID } = req.params;

    try {
        const result = await TaskModel.findByIdAndUpdate(
            taskID,
            { name: req.body.name, completed: req.body.completed },
            { new: true, runValidators: true, overwrite: true, }
        );

        // Resource not found
        if (!result) {
            return res.status(404).send(`No Task with the specified ID: ${taskID} found!`)
        }

        res.status(200).send({ status: 'success', task: result });
    } catch (err) {

        if (err.name === 'ValidationError') {

            // Bad Request
            return res.status(400).send({ status: 'error', msg: err });
        }

        // Internal Server Error
        res.status(500).send({ status: 'error', msg: err });
    }
}


/* Delete Task */
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;

        const result = await TaskModel.findByIdAndDelete(taskID)

        if (!result) {
            return res.status(404).send(`No Task with the specified ID: ${taskID} found!`)
        }

        res.status(200).send({ status: 'success', data: result });
    } catch (err) {
        res.status(500).send({ status: 'error', msg: err })
    }
}


/* Exports */
module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, editTask };