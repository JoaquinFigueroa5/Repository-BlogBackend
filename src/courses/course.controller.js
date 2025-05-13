import Course from "./course.model.js";

export const createCourses = async() => {
    try {
        const existRoles = await Course.find({ course: { $in: ['Tecnologia', 'Taller', 'Practica']} });

        if(existRoles.length < 3){
            if(!existRoles.some(course => course.course === 'Tecnologia' )){
                await new Course({ 
                    course: 'Tecnologia',
                    description: 'Diseño y desarrollo de aplicaciones con Node.js y React.js bajo el patrón MVC, integrando bases de datos NoSQL locales o remotas, y emplear herramientas de inteligencia artificial para optimizar el desarrollo de software, garantizando soluciones tecnológicas efectivas, responsables y éticas que prioricen la privacidad y seguridad de la información en entornos empresariales.',
                    image: 'https://media.giphy.com/media/BDfPH990CCYA0IR4Pk/giphy.gif'
                }).save();
            }
            if(!existRoles.some(course => course.course === 'Taller' )){
                await new Course({ 
                    course: 'Taller',
                    description: 'Diseño y desarrollo de aplicaciones con Node.js y React.js bajo el patrón MVC, integrando bases de datos NoSQL locales o remotas, y emplear herramientas de inteligencia artificial para optimizar el desarrollo de software, garantizando soluciones tecnológicas efectivas, responsables y éticas que prioricen la privacidad y seguridad de la información en entornos empresariales.',
                    image: 'https://media.giphy.com/media/F9p9Ifz2zxk2JY1YAs/giphy.gif'
                }).save();
            }
            if(!existRoles.some(course => course.course === 'Practica' )){
                await new Course({ 
                    course: 'Practica',
                    description: 'Diseño y desarrollo de aplicaciones con Node.js y React.js bajo el patrón MVC, integrando bases de datos NoSQL locales o remotas, y emplear herramientas de inteligencia artificial para optimizar el desarrollo de software, garantizando soluciones tecnológicas efectivas, responsables y éticas que prioricen la privacidad y seguridad de la información en entornos empresariales.',
                    image: 'https://media.giphy.com/media/QA1quSM6AFRYvI70cU/giphy.gif'
                }).save();
            }
        }

    } catch (error) {
        console.log('Error to creating courses: ', error);
        
    }
}

export const getCourses = async(req, res) => {
    const query = {state: true};
    console.log(query);
    

    try {
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
        ])

        return res.status(200).json({
            success: true,
            msg: "Courses obtained successfully",
            total,
            courses
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: "Error to get courses",
            error: error.message || error
        })
    }
}