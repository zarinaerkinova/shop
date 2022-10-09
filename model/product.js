const path = require('path')
const fs = require('fs')

module.exports = class Product{

    static async find(){
        return new Promise((resolve, reject)=>{
            fs.readFile(path.join(__dirname, '..','data', 'products.json'),(err,data)=>{
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
            fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'), 
            JSON.stringify(data),
            (err)=>{
                if(err){
                    reject(err)
                }

                resolve()
            })
        })
    }

    static async findById(id){
        const products = await this.find()
        console.log(id);
        return products.find(product => +product.id === +id)
    }

    static async updateById(body, id){
        const products = await this.find()
        const idx = products.find(product => +product.id === +id)
        const index = products.indexOf(idx)
        console.log(idx);
        console.log(body);

        if(index < 0) {
            return 'Not found!'
        }

        if(!body.name) {
            body.name = idx.name
        } else {
            idx.name = body.name
        }

        if(!body.price) {
            body.price = idx.price
        } else {
            idx.price = body.price
        }

        body.id = idx.id
        body.categoryId = idx.categoryId

        return new Promise((resolve, reject)=>{
            fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'), 
            JSON.stringify(products),
            (err)=>{
                if(err){
                    reject(err)
                }

                resolve()
            })
        }), 'Updated'
    }

    static async deleteById(id){
        const products = await this.find()
        console.log(id);
        const product = products.find(product => +product.id === +id)
        const idx = products.indexOf(product)
        console.log(!idx);
        if(idx < 0) {
            return 'Not found!'
        }

        products.splice(idx, 1)

        return new Promise((resolve, reject)=>{
            fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'), 
            JSON.stringify(products),
            (err)=>{
                if(err){
                    reject(err)
                }

                resolve()
            })
        }), 'Deleted'
    }
}