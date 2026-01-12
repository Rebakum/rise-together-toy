import { Request, RequestHandler, Response } from "express"
import { usersService } from "./usersServices"


const register = async(req:Request,res:Response)=>{
  try{
    const payload = req.body
    if(!payload.email || !payload.password || !payload.name){
      return res.status(400).json({
        success:false,
        message:"Missing required fields"
      })
    }
    const user = await usersService.createUser(payload )
    res.status(201).json({
      success: true,
      message:"User registered successfully",
      data:user
    })
  }catch(error:any){
if(error.message === "Email Already Exists"){
  return res.status(400).json({
    success: false,
    message: error.message
  })
}
  }
}

const getAllUsers = async(req:Request, res:Response)=>{
  try{
    const result = await usersService.getAllUsers()
    res.status(200).json({
      success:true,
      data:result
    })

  }catch(error:any){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const getUserById = async(req:Request, res:Response)=>{
  try{
    const id = (req.params.id as string)
    const result = await usersService.getUserById(id)
    res.status(200).json({
      success: true,
      data: result
    })

  }catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const upDateUser = async(req:Request, res:Response)=>{
  try{
    const id = req.params.id as string
    const payload = req.body
    const result = await usersService.upDateUser(id, payload)
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const deleteUser = async(req:Request, res:Response)=>{
  try{
    const id = req.params.id as string
    const result = await usersService.deleteUser(id)
    res.status(200).json({
      success: true,
      data: result
    })

  }catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

}

export const usersController = {
    register,
    getAllUsers,
    getUserById,
    upDateUser,
    deleteUser

}