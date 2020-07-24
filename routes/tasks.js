const router = require("express").Router();
const {
  getTasks,
  postTask,
  completeTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").get(getTasks).post(postTask);

router.route("/:id").patch(completeTask).delete(deleteTask);

module.exports = router;
