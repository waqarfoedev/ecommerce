import bcrypt from "bcrypt";

export const hashpassword=async(password)=>{
    try {

        const saltRounds=10;
        const hashedpassword=await bcrypt.hash(password, saltRounds)
        return hashedpassword
    } catch (error) {
        console.lgo(error)
    }
}

export const comparePassword=async(password, hashedpassword)=>{
    return bcrypt.compare(password, hashedpassword)
}