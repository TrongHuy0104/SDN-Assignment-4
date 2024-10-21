const router = require("express").Router();
const studentController = require("../controllers/studentController");

router
    .route("/")
    .get(studentController.getAllStudents)
    .post(studentController.createStudent);

router
    .route("/:id")
    .get(studentController.getStudent)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router;
