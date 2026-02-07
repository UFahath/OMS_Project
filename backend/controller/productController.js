// Post Product// Post Product

// import ProductCategory from "../model/productCategoryModel"
import  ProductCategory from "../model/productCategoryModel.js"



async function getAllProducts(req, res) {
  try {
    const products = await ProductCategory.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export default getAllProducts