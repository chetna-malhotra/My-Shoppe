import bcrypt from 'bcryptjs'
const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('12345',10),
        isAdmin:true
    },
    {
        name:'Test Guy',
        email:'test@example.com',
        password:bcrypt.hashSync('12345',10)
    },
    {
        name:'Ankit',
        email:'ankit@example.com',
        password:bcrypt.hashSync('12345',10)
    }
]
export default users