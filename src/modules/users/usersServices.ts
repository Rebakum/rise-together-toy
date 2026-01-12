
import { string } from "better-auth/*";
import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";


const createUser = async(payload:any)=>{
     const { email, password, name } = payload;
     const existingUser = await prisma.user.findUnique({
        where:{email},
     })
     if(existingUser){
        throw new Error("User already exists")
     }
     const result = await prisma.user.create({
        data:{
            email,password,name
        }
     })
     return result
}

const getAllUsers = async()=>{
    const  result = await prisma.user.findMany()
    return result
}
const getUserById = async(id:string):Promise<User>=>{
    const result = await prisma.user.findUnique({
        where:{id }
    })
    if(!result){
        throw new Error("User not found")
        
    }
    return result
}

const upDateUser = async(id:string, payload:any)=>{

    const result = await prisma.user.update({
        where:{id},
        data: payload
    })
    return result
}
const deleteUser = async(id: string)=>{
    const result = await prisma.user.delete({
        where:{id}
    })
}
export const usersService ={
    createUser,
    getAllUsers,
    getUserById,
    upDateUser,
    deleteUser
}