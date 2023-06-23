const RestaurantModel = require('../restaurant/restaurant');
const CategoryModel = require('../restaurant/category');
const DishModel = require('../restaurant/dishes');
//const CATEGORY_LIST = require('../../config/constant');
const sendResponse = require('../../helpers/requestHandler.helper');
const dishes = require('../restaurant/dishes');



exports.addRestaurant = async(req,res,next) =>{
    try{
        const saveRestaurant = await RestaurantModel.create(req.body);
        return sendResponse(res,true,200,"Restaurant added successfully",saveRestaurant);

    }catch(err){
        console.log(err);
    }
};

exports.getRestaurant = async(req,res,next) =>{
    try{
        const getRestaurant = await RestaurantModel.aggregate([{
            $match:{location:req.query.location}
        }]);
        return sendResponse(res,true,200,"Restaurant fetched successfully",getRestaurant);
    }catch(err){
        console.log(err);
    }
};


const CATEGORY_LIST =[
    {name: "pizza"},
    {name: "burger"},
    {name: "paneer"},
    {name: "biryani"},
    {name: "noodles"},
    {name: "fried rice"},
    {name: "rolls"},
    {name: "sandwich"},
    {name: "fries"},
    {name: "cake"},
    {name: "milkshake"},
    {name: "paratha"},
    {name: "pasta"},

]



async function seedData() {
    try {
        await CategoryModel.deleteMany();

        const category = await CategoryModel.create(CATEGORY_LIST);

        console.log("added ")

    } catch (err) {
        console.log(err);
    }
};
//seedData();

exports.getAllCategory = async(req,res,next) =>{
    try{
        const getCategory = await CategoryModel.find({});
        return sendResponse(res,true,200,"Category fectched successfully",getCategory);
    }catch(err){
        console.log(err)
    }
};

exports.getAllDish = async(req,res,next) =>{
    try{
        const getDish = await DishModel.find({restuarantId:req.query.restuarantId})
        .lean()
        .populate({
            path: "restaurantId",
            select: ["name","description","location"]
        })
        .select([
            "name",
            "description",
            "price"
        ]);
        console.log(getDish)

        return sendResponse(res,true,200,"Dishes fetched successfully",getDish);

    }catch(err){
        console.log(err)
    }
};

exports.addDish = async (req, res, next) => {
    try {
        const checkDish = await DishModel.findOne({ name: req.body.name });

        if (checkDish) {
            return sendResponse(res, true, 400, "Dish is alraedy present in the menu");
        }

        const checkRestaurant = await RestaurantModel.findOne({ _id: req.body.restaurantId });
        if (!checkRestaurant) {
            return sendResponse(res, true, 400, "Restaurant not found");
        }
        const checkCategory = await CategoryModel.findOne({ _id: req.body.categoryId });
        if (!checkCategory) {
            return sendResponse(res, true, 400, "Category not found");
        }

        const saveDish = await DishModel.create(req.body);
        console.log(saveDish._id)
        await RestaurantModel.create({categoryId:saveDish._id})
        return sendResponse(res, true, 200, "Dish added successfully", saveDish);

    } catch (err) {
        console.log(err)
    }
};

exports.updateDishDetails = async(req,res,next) =>{
    try{
        const getDish = await DishModel.findOne({_id:req.query._id});

        await DishModel.findOneAndUpdate({_id:getDish._id},{$set:{...req.body}},{new:true});
        return sendResponse(res,true,200,"Dish updated successfully");
    }catch(err){
        console.log(err)
    }
};

exports.deleteDishFromRestaurant = async (req, res, next) => {
    try {
    //     const getRestaurant = await RestaurantModel.aggregate([
    //         // {
    //         //     $match:{_id:req.body.restaurantId},
    //         // },
    //         {
    //             $lookup:{
    //                 from: "DishModel",
    //                 localField: "_id",
    //                 foreignField: "restaurantId",
    //                 as: "dishes"
    //             }
    //         },
    //         {
    //             $set:{
    //                 dishes:{
    //                     $filter:{
    //                         input: '$dishes',
    //                         as: 'dish',
    //                         cond:{
    //                             $ne:['$$dish._id',req.body._id]
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         // {
    //         //     $out: 'DishModel'
    //         // }
    //     ]);
    //     //console.log(getRestaurant)
    //    // console.log(dish)
    //    if (getRestaurant.length > 0) {
    //     const restaurant = getRestaurant[0]; // Assuming only one restaurant is matched
    //     const dishes = restaurant.dishes;
      
    //     dishes.forEach((dish) => {
    //       console.log(dish);
    //     });
    //   } else {
    //     console.log("Restaurant not found or no dishes available.");
    //   }
    //     return sendResponse(res,true,200,"Dish deleted successfully");

    const getDetail = await DishModel.find({restaurantId:req.body.restaurantId,_id:req.body._id});
    // console.log(getDetail);
    // console.log(getDetail[0]._id)

    await DishModel.deleteOne(getDetail[0]._id);
    return sendResponse(res,true,200,"Dish deleted successfully")
       

    } catch (err) {
        console.log(err)
    }
};


exports.getAllRestaurantFromCategory = async(req,res,next) =>{
    try{
        const getRestaurantFromCategory = await DishModel.find({categoryId:req.query.categoryId})
        .lean()
        .populate({
            path:"restaurantId",
            select :["name","description"]
        });
        console.log(getRestaurantFromCategory)
        return sendResponse(res,true,200,"Restaurant fetched successfully",getRestaurantFromCategory);

    }catch(err){
        console.log(err)
    }
};

