const router = require("express").Router();
const quizController = require("../controllers/quizController");
const questionController = require("../controllers/questionController");
const questionRouter = require("./questionRoutes");

router.use("/:quizId", questionRouter);

router
    .route("/")
    .get(quizController.getAllQuizzes)
    .post(quizController.createQuiz);

router
    .route("/:quizId")
    .get(quizController.getQuiz)
    .patch(quizController.updateQuiz)
    .delete(quizController.deleteQuiz);

router.route("/:quizId/populate").get(quizController.getQuestionsByKeyword);
module.exports = router;
