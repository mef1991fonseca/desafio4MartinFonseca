const express = require("express");
const Contenedor = require("../contenedorProductos");
const productsRouter = express.Router();

const listaProductos = new Contenedor("productos.txt");

productsRouter.get("/",async(request,response)=>{
    try {
        const productos = await listaProductos.getAll();
        console.log(productos)
        response.send(productos)
    } catch (error) {
        response.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.get("/:id", async(request,response)=>{
    const {id} = request.params;
    const producto = await listaProductos.getById(parseInt(id));
    if(producto){
        response.json({
            message:"producto encontrado",
            product: producto
        })
    }else{
        response.json({
            message:"producto no encontrado"
        })
    }
})

productsRouter.post("/",async(request,response)=>{
    const newProduct = request.body;
    const productos = await listaProductos.save(newProduct);
    response.json({
        message:"producto creado",
        response: productos
    })
})

productsRouter.delete("/:id", async(request,response)=>{
    const {id} = request.params;
    const productosActualizados = await listaProductos.deleteById(parseInt(id));
    response.json({
        message:`El producto con el id ${id} fue eliminado `,
        response: productosActualizados
    })
})

productsRouter.put("/:id", async(request,response)=>{
    const {id} = request.params
    const newInfo = request.body
    const productosActualizados = await listaProductos.updateById(parseInt(id),newInfo)
    response.json({
        message:`El producto con el id ${id} fue actualizado`,
        response: productosActualizados
    })
})

module.exports = productsRouter