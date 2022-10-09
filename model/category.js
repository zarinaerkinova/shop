const path = require('path')
const fs = require('fs')
const Product = require("./product")

module.exports = class Category{
    static async find(){
        return new Promise((resolve, reject)=>{
            fs.readFile(path.join(__dirname, '..','data', 'categories.json'), (err, data)=>{
                if(err){
                    reject(err);
                }

                resolve(JSON.parse(data))
            })
        })
    }

    static async save(body){
        const data = await this.find()

        body.id = data.length + 1

        data.push(body);
        
        return new Promise((resolve, reject)=>{
            fs.writeFile(path.join(__dirname, '..', 'data', 'categories.json'), 
            JSON.stringify(data),
            (err)=>{
                if(err){
                    reject(err)
                }

                resolve()
            })
        })
    }

    static async deleteById(id){
        const categories = await this.find()
        console.log(id);
        const product = categories.find(product => +product.id === +id)
        const idx = categories.indexOf(product)
        console.log(!idx);
        if(idx < 0) {
            return 'Not found!'
        }

        categories.splice(idx, 1)

        return new Promise((resolve, reject)=>{
            fs.writeFile(path.join(__dirname, '..', 'data', 'categories.json'), 
            JSON.stringify(categories),
            (err)=>{
                if(err){
                    reject(err)
                }

                resolve()
            })
        }), 'Deleted'
    }

    static async findById(id){
        const products = await Product.find()
        const categories = await this.find()
        const category = categories.filter(category => +category.id === +id)[0]

        console.log(category);
        const categoryProducts = products.filter(product => +product.categoryId === +id)
        return {category: category, products: categoryProducts}
    }

    static async updateById(body, id){
        const category = await this.find()
        const idx = category.find(product => +product.id === +id)
        const index = category.indexOf(idx)
        console.log(idx);
        console.log(body);

        if(index < 0) {
            return 'Not found!'
        }

        if(!body.type) {
            body.type = idx.type
        } else {
            idx.type = body.type
        }

        body.id = idx.id

        return new Promise((resolve, reject)=>{
            fs.writeFile(path.join(__dirname, '..', 'data', 'categories.json'), 
            JSON.stringify(category),
            (err)=>{
                if(err){
                    reject(err)
                }

                resolve()
            })
        }), 'Updated'
    }
}