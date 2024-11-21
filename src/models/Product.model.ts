import {Table, Column, Model, DataType, Default} from 'sequelize-typescript';

//decoradores inician con @
@Table({
    tableName: 'products'
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        // type: DataType.FLOAT(6, 2)--no soporta esta sintaxis postgresql
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}
export default Product;