const mongoose = require("mongoose");
// make schema for task
// title: 'task1',
// description: 'task1 description',
// location: '(x, y)',
// isTaken: false,
// taskId: 1,
// senderInfo: '{}',
// receiverInfo: '{}',
// posterId: 'posterId1',
// takerId: 'takerId1',
// timeRemaining: 'timeRemaining1',
// status: 'status1',
// confirmCode: 'confirmCode1'
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isTaken: {
      type: Boolean,
      required: true,
    },
    taskId: {
      type: Number,
      required: true,
    },
    senderInfo: {
      type: JSON,
      required: true,
    },
    receiverInfo: {
      type: JSON,
      required: true,
    },
    posterId: {
      type: String,
      required: true,
    },
    takerId: {
      type: String,
      required: true,
    },
    timeRemaining: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    confirmCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
