
import { connectDB } from "../server";
import db from "../config/db";


jest.mock('../config/db')

describe('connectDB', ()=>{
     it('should handle database connection error', async()=>{
          jest.spyOn(db, 'authenticate')
          .mockRejectedValueOnce(new Error('Hubo un error al conectar la BD'))

          const consoleSpy = jest.spyOn(console, 'log')

          await connectDB()

          expect(consoleSpy).toHaveBeenCalledWith(
               expect.stringContaining('Hubo un error al conectar la BD'  )
          )
     })
})

//console.log(res.header['content-type']);//application/json; charset=utf-8

//toBe()  -- espera un valor primitivo
//toMach()  -- espera un string que coincida con una expresion regular

//expect()   --espero 
//toBe()    --que  sea
  
// describe('Nuestro primer test', ()=>{
//    it('Debe revisar que 1 +1 sea 2', ()=> {
//         expect(1+1).toBe(2)
//    })
//    it('Debe revisar que 1 +1 no sea 3', ()=> {
//         expect(1+1).not.toBe(3)
//    })
// })

// //las prueban se pueden hacer con 2 sintaxis
// //test() o it()