import Course from "./course.model.js";

export const createCourses = async() => {
    try {
        const existRoles = await Course.find({ course: { $in: ['Tecnologia', 'Taller', 'Practica']} });

        if(existRoles.length < 3){
            if(!existRoles.some(course => course.course === 'Tecnologia' )){
                await new Course({ course: 'Tecnologia' }).save();
            }
            if(!existRoles.some(course => course.course === 'Taller' )){
                await new Course({ course: 'Taller'}).save();
            }
            if(!existRoles.some(course => course.course === 'Practica' )){
                await new Course({ course: 'Practica'}).save();
            }
        }

    } catch (error) {
        console.log('Error to creating courses: ', error);
        
    }
}