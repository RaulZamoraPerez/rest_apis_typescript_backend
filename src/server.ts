import express from 'express';
import colors from 'colors';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import router from './router';
import db from './config/db';

//conectar a la base de datos
export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue('Conexion exitosa a la BD'))

    } catch (error) {
        console.log( colors.red.bold(' Hubo un error al conectar la BD'))
    }
}
connectDB();

//instancia de express
const server = express();

//Permitir conexiones
const corsOptions : CorsOptions ={
    origin: function(origin, callback){  //----------------------------------quien me esta enviando la peticion
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)

        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions));

//leer datos de formularios
server.use(express.json());

//morgan 
server.use(morgan('dev'))

server.use('/api/products', router)

//DOCUMENTACION
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server;