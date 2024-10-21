const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    studentCode: {
        type: String,
        unique: true,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
