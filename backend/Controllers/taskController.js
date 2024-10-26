const Tasks = require('../Models/Tasks.js');

class TaskController {
  createTask = async (req, res) => {
    const { title, description, startTime, endTime, date } = req.body;

    if (!req.user._id) {
      return res.status(403).json({
        message:
          'some error occurred user information is not availaible to insert user data',
      });
    }

    if (!title || !description || !startTime || !endTime) {
      return res
        .status(403)
        .json({ message: 'email and password is not provided' });
    }

    const taskCreated = await Tasks.create({
      title,
      description,
      date,
      startTime,
      endTime,
      User: req.user._id,
    });
    console.log({ taskCreated });
    return res
      .status(200)
      .json({ message: 'successfully created new task', taskCreated });
  };

  getRecentTasks = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(403).json({
          message: 'User information is not available',
        });
      }

      const recentTasks = await Tasks.find({ User: req.user._id }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        message: `Successfully fetched ${0} recent tasks`,
        tasks: recentTasks,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while fetching recent tasks',
      });
    }
  };

  deleteTask = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(403).json({
          message: 'User information is not available',
        });
      }
      const recentTasks = await Tasks.findOneAndDelete({ _id: req.params.id });
      return res.status(200).json({
        message: `Successfully Deleted ${req.params.id} tasks`,
        tasks: recentTasks,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while fetching recent tasks',
      });
    }
  };

  updateTask = async (req, res) => {
    try {
      // Ensure user is authorized
      if (!req.user || !req.user._id) {
        return res.status(403).json({
          message: 'User information is not available',
        });
      }

      // Extract task ID and the update data
      const { id } = req.params;
      const updateData = req.body;

      // Find and update the task by ID
      const updatedTask = await Tasks.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true } // Return the updated task document
      );

      // If the task is not found, return a 404 error
      if (!updatedTask) {
        return res.status(404).json({
          message: 'Task not found',
        });
      }

      // Return success response with updated task
      return res.status(200).json({
        message: `Successfully updated task with ID: ${id}`,
        task: updatedTask,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while updating the task',
      });
    }
  };
}

module.exports = new TaskController();
