
import jwt from "jsonwebtoken";


export function generateJWT(payload: object, key: string, expiresIn: '24h' | '7d' = '24h'): {token?: string, error?: string }{
    if(!payload){
      return { error:"invalid payload provided"}
    }

    console.log(key, "key")

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

  export  function validateJWT(token: string, secretKey: string): {payload?: any, error?: string}{
      try{
        const payload = jwt.verify(token, secretKey);
        return {payload: payload}
      } catch(err){
        return{
          error: String(err) ?? 'invalid / expired token'
        }
      }
  }