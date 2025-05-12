import { Schema, model } from "mongoose";

const CourseSchema = Schema({
    course: {
        type: String,
        required: [true, 'The course is required']
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

export default model('Course', CourseSchema);