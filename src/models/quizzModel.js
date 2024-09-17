const mongoose = require("mongoose");

const quizzSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title can not be empty!"],
        unique: true,
    },
    description: String,
    questions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Question",
            // required: [true, "Question must belong to a quiz."],
        },
    ],
});


// quizzSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: "questions",
//         select: "-__v",
//     });
//     next();
// });
const Quiz = mongoose.model("Quiz", quizzSchema);

module.exports = Quiz;
