import { Schema, model } from "mongoose";

const CourseSchema = Schema({
    course: {
        type: String,
        required: [true, 'The course is required']
    }
});

export default model('Course', CourseSchema);