
import jwt from "jsonwebtoken";


export function generateJWT(payload: object, key: string, expiresIn: '24h' | '7d' = '24h'): {token?: string, error?: string }{
    if(!payload){
      return { error:"invalid payload provided"}
    }

    if(!expiresIn){
      expiresIn = '24h'
    }
    
    try{
      const token = jwt.sign(payload, key, {expiresIn})
      return {token}
    } catch(error){
      return {error: String(error)}
    }
  }

export async function validateJWT(token: string, secretKey: string){
    
  }