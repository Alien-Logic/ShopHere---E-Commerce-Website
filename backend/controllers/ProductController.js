import prodModel from "../models/ProductSchema.js";

const getAllProducts=(req, res)=>{
    prodModel.find({})
    .then(data=> res.json({"err":0, "prodata":data}))
    .catch(err=> res.json({"err":1, "msg":"something went wrong"}))
}

const getProductById=(req, res)=>{
  console.log("get products")
  console.log(req.params)
  prodModel.findById(req.params.id)
    .then(data=> res.json({"err":0, "prodata":data}))
    .catch(err=> res.json({"err":1, "msg":"something went wrong"}))

    //res.json({"err":0, "msg":"get product by id"})
}

const addProduct=(req, res)=>{
 
   if(req.file.filename){
    console.log(req.body)
    const addItem=new prodModel({name:req.body.name, category:req.body.category, price:req.body.price,quantity:req.body.quantity,features:req.body.features,
    imagePath:req.file.filename})
    addItem.save()
    .then(data=> res.json({"err":0, "msg":"product Added"}))
    .catch(err=> res.json({"err":1, "msg":"something went wrong!"}))

   }
   else{
    res.json({"err":1, "msg":"something went wrong!"})
   }
}

const deleteProduct=(req, res)=>{
  console.log(req.params)
  const proId = req.params.id;
  if (!proId) {
    res.json({"err": 1, "msg": "Invalid pro id"})
  }

  prodModel.findOneAndDelete(proId)
    .then(data=> res.json({"err":0, "msg": "Product deleted"}))
    .catch(err=> res.json({"err":1, "msg":"something went wrong"}))
}

const editProduct = (req, res) => {
  console.log(req.params)
    const pro_Id = req.params.id; 

    console.log(pro_Id)
    console.log("Hello", req.body);
   
    if (!pro_Id) {
      return res.json({ "err": 1, "msg": "Invalid product ID" });
    }
  
   
    prodModel.findByIdAndUpdate(
      pro_Id,
      {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        features: req.body.features,
      },
      { new: true } 
      )
        .then((updatedProduct) => {
          if (!updatedProduct) {
            return res.json({ "err": 1, "msg": "Product not found" });
          }
          res.json({ "err": 0, "msg": "Product updated", "data": updatedProduct });
        })
        .catch((err) => res.json({ "err": 1, "msg": "Something went wrong!" }));
    };
    
   


export {getAllProducts, getProductById, addProduct, deleteProduct, editProduct}