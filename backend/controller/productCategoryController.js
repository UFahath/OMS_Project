// import ProductCategory from "../models/ProductCategoryModel.js";

import ProductCategory from "../model/productCategoryModel.js";

//CreateProductCategory
export const createProductCategory = async (req, res) => {
  try {
    const {
      category_name,
      description,
      parent_category_id = null,
      status = "ACTIVE",
    } = req.body;

   
    if (!category_name) {
      return res.status(400).json({
        msg: "Category_name required",
      });
    }


    const existingCategory = await ProductCategory.findOne({ category_name });
    if (existingCategory) {
      return res.status(409).json({
        msg: "category already exists",
      });
    }


    const newCategory = await ProductCategory.create({
      category_name,
      description,
      parent_category_id,
      status,
    });

    return res.status(201).json({
      msg: "Product category created successfully",
      data: newCategory,
    });
  } catch (error){
    if (error.code === 11000) {
      return res.status(409).json({
        msg: "Duplicate value found",
        error: error.keyValue,
      });
    }

    return res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

//@ReadProductCategory
export const getProductCategory = async(_,res)=>{
  try{
   const productCategory = await ProductCategory.find({}).sort({category_name:1});
   return res.status(200).json({msg:"Product category retrieved",data:productCategory});
  }catch(err){
    res.status(500).json({msg:"Internal server error",error:err.message});
  }
}
