import {Router} from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()
/** 
 * @swagger
 * components:
 *         schemas:
 *              Product:
 *                  type: object
 *                  properties:
 *                     id:
 *                          type: integer
 *                          description: The Product ID
 *                          example: 1
 *                    
 *                     name:
 *                          type: string
 *                          description: The Product Name
 *                          example: "Laptop"
 *                     
 *                     price:
 *                         type: number 
 *                         description: The Product Price    
 *                         example: 1000
 * 
 *                     availability:
 *                         type: boolean
 *                         description: The Product Availability
 *                         example: true
 */




/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Get a list of products
 *        tags:
 *             - Products
 *        description: Return a list of products
 *        responses:
 *           200:
 *              description: Successfull response
 *              content:
 *                 application/json:
 *                     schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 * 
 */

router.get('/', getProducts )


/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *         summary: Get a product by ID
 *         tags:
 *              - Products
 *         description: Return a based on its unique ID
 *         parameters: 
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *         responses:
 *              200:
 *                  description: Successfull response
 *                  content:       
 *                      application/json: 
 *                         schema:  
 *                              $ref: '#/components/schemas/Product'
 *                       
 *              400:
 *                  description: Bad Request - Invalid ID
 *                  
 * 
 *              404:
 *                  description: Product not found  
 *                  
 * 
 */
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById )


/**
 * @swagger
 * /api/products:
 *   post: 
 *     summary: Create a new product
 *     tags:
 *         - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                          name: 
 *                               type: string    
 *                               example: "Laptop"
 *                          price:
 *                               type: number
 *                               example: 1000
 * 
 *     responses:  
 *        201:
 *            description: Successfull response
 *            content:
 *                 application/json:
 *                       schema:  
 *                           $ref: '#/components/schemas/Product'
 *    
 *        400:               
 *            description: Bad Request - Invalid input data
 * 
 */
router.post('/',
             //validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
     
    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value)=>value >0).withMessage('Precio no valido'),
    
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters: 
 *            - in: path 
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                          name: 
 *                               type: string    
 *                               example: "Laptop"
 *                          price:
 *                               type: number
 *                               example: 1000
 *                          availability:
 *                               type: boolean   
 *                               example: true  
 *      responses:  
 *           200:
 *               description: Successfull response
 *               content:
 *                    application/json:
 *                        schema:  
 *                            $ref: '#/components/schemas/Product'
 *           400:
 *                description: Bad Request - Invalid ID or  Invalid input data  
 *           404:
 *                description: Product not found
 */
router.put('/:id', 
    
    param('id').isInt().withMessage('ID no valido'),
    body('name')
       .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
       .isNumeric().withMessage('valor no valido')
       .notEmpty().withMessage('El precio del producto no puede ir vacio')
       .custom((value)=>value >0).withMessage('Precio no valido'),
       
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
        
        handleInputErrors,
    updateProduct)


 /**
  *@swagger 
  * /api/products/{id}:
  *  patch:
  *    summary: Update Product Availability
  *    tags: 
  *         - Products
  *    description: Returns the updated availability 
  *    parameters: 
  *            - in: path 
  *              name: id
  *              description: The ID of the product to retrieve
  *              required: true
  *              schema:
  *                  type: integer
  * 
  *    responses:  
 *           200:
 *               description: Successfull response
 *               content:
 *                    application/json:
 *                        schema:  
 *                            $ref: '#/components/schemas/Product'
 *           400:
 *                description: Bad Request - Invalid 
 *           404:
 *                description: Product not found
  */   

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)


    /**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *       summary: Delete a product by ID
 *       tags:
 *          - Products
 *       description: Returns a confirmation message
 *       parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true   
 *            schema:
 *                type: integer
 *     
 *       responses:
 *         200:
 *            description: Successfull response
 *            content:
 *                application/json:
 *                    schema:
 *                        type:  string
 *                        value: 'Producto Eliminado'
 *         400:
 *            description: Bad Request - Invalid ID
 *         404:
 *            description: Product not found
 *           
 * 
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)



export default router;

//custom()  --validacion personalizada