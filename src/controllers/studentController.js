const Student = require("../models/studentModel");

exports.getAllStudents = async (req, res) => {
    try {
        const responses = await Student.find();
        const students = responses.map((student) => ({
            _id: student._id,
            name: student.fullName,
            studentCode: student.studentCode,
            isActive: student.isActive,
        }));

        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server",
        });
    }
};

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: {
                _id: student._id,
                name: student.fullName,
                studentCode: student.studentCode,
                isActive: student.isActive,
            },
        });
    } catch (err) {
        let statusCode;
        let message;
        if (err.name === "CastError") {
            statusCode = 404;
            message = "Student ID does not exist";
        } else {
            statusCode = 500;
            message = "Something went wrong on the server";
        }
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create({
            fullName: req.body.name,
            ...req.body,
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: {
                _id: newStudent._id,
                name: newStudent.fullName,
                studentCode: newStudent.studentCode,
                isActive: newStudent.isActive,
            },
        });
    } catch (err) {
        console.log("err", err);

        let statusCode;
        let message;
        if (err.code === 11000) {
            statusCode = 400;
            message = "Invalid student code format";
        } else {
            statusCode = 500;
            message = "Something went wrong on the server";
        }
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { ...req.body, fullName: req.body.name },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: "success",
            message: "Student updated successfully",
            data: {
                _id: student._id,
                name: student.fullName,
                studentCode: student.studentCode,
                isActive: student.isActive,
            },
        });
    } catch (err) {
        let statusCode;
        let message;
        if (err.code === 11000) {
            statusCode = 400;
            message = "Invalid student code format";
        } else if (err.name === "CastError") {
            statusCode = 404;
            message = "Student ID does not exist";
        } else {
            statusCode = 500;
            message = "Something went wrong on the server";
        }
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
        });
    } catch (err) {
        let statusCode;
        let message;
        if (err.name === "CastError") {
            statusCode = 404;
            message = "Student ID does not exist";
        } else {
            statusCode = 500;
            message = "Something went wrong on the server";
        }
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
};
