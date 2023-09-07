const RestaurantModel = require('../restaurant/restaurant');
const CategoryModel = require('../restaurant/category');
const UserModel = require('../userAuth/user.model');
const DishModel = require('../restaurant/dishes');
const CartModel = require('../restaurant/cart');
const CATEGORY_LIST = require('../../config/constant');
const mongoosePaginate = require('mongoose-paginate');
const sendResponse = require('../../helpers/requestHandler.helper');




exports.addRestaurant = async (req, res, next) => {
    try {
        const checkName = await RestaurantModel.find({ name: req.body.name });
        if (checkName.length > 0) {
            return sendResponse(res, true, 200, "Restaurant name is already taken")

        }
        const saveRestaurant = await RestaurantModel.create(req.body);
        return sendResponse(res, true, 200, "Restaurant added successfully", saveRestaurant);

    } catch (err) {
        console.log(err);
    }
};

exports.getRestaurant = async (req, res, next) => {
    try {
        const getlocation = await UserModel.findById({ _id: req.user.userId });
        const getRestaurant = await RestaurantModel.find({location: getlocation.location});
        return sendResponse(res, true, 200, "Restaurant fetched successfully", getRestaurant);
    } catch (err) {
        console.log(err);
    }
};

// seed function to save category in database

exports.seederSaveCategory = async (req, res) =>{
    try{
        const category = await CategoryModel.countDocuments();
        if(category == 0){
            await CategoryModel.create(category_List);
        }
    }catch(error){
        return sendResponse(res,true,500,"Internal server error",error);
    }
};



// async function seedData() {
//     try {
//         await CategoryModel.deleteMany();

//         const category = await CategoryModel.create(CATEGORY_LIST);

//         console.log("added ")

//     } catch (err) {
//         console.log(err);
//     }
// };
//seedData();

exports.getAllCategory = async (req, res, next) => {
    try {
        const getCategory = await CategoryModel.find({});
        return sendResponse(res, true, 200, "Category fectched successfully", getCategory);
    } catch (err) {
        console.log(err)
    }
};

exports.getAllDish = async (req, res, next) => {
    try {
        const getDish = await DishModel.find({ restaurantId: req.query.restaurantId })
            .lean()
            .populate({
                path: "restaurantId",
                select: ["name", "description", "location"]
            })
            .select([
                "name",
                "description",
                "price"
            ]);

        return sendResponse(res, true, 200, "Dishes fetched successfully", getDish);

    } catch (err) {
        console.log(err)
    }
};

exports.addDish = async (req, res, next) => {
    try {
        const checkDish = await DishModel.findOne({ name: req.body.name });

        if (checkDish && checkDish.restaurantId == req.body.restaurantId) {
            return sendResponse(res, true, 400, "Dish is alraedy present in the menu");
        }

        // const checkRestaurant = await RestaurantModel.findOne({ _id: req.body.restaurantId });
        // if (!checkRestaurant) {
        //     return sendResponse(res, true, 400, "Restaurant not found");
        // }
        const checkCategory = await CategoryModel.findOne({ _id: req.body.categoryId });
        if (!checkCategory) {
            return sendResponse(res, true, 400, "Category not found");
        }

        await DishModel.create(req.body);
        //console.log(saveDish._id)
        //await RestaurantModel.create({ categoryId: saveDish._id })
        return sendResponse(res, true, 200, "Dish added successfully");

    } catch (err) {
        console.log(err)
    }
};

exports.updateDishDetails = async (req, res, next) => {
    try {
        const getDish = await DishModel.findOne({ _id: req.query._id });

        await DishModel.findOneAndUpdate({ _id: getDish._id }, { $set: { ...req.body } }, { new: true });
        return sendResponse(res, true, 200, "Dish updated successfully");
    } catch (err) {
        console.log(err)
    }
};

exports.deleteDishFromRestaurant = async (req, res, next) => {
    try {

        const getDetail = await DishModel.find({ restaurantId: req.query.restaurantId });
        await DishModel.deleteOne(getDetail[0]._id);
        return sendResponse(res, true, 200, "Dish deleted successfully")


    } catch (err) {
        console.log(err)
    }
};


exports.getAllRestaurantFromCategory = async (req, res, next) => {
    try {
        const getRestaurantFromCategory = await DishModel.find({ categoryId: req.query.categoryId })
            .lean()
            .populate({
                path: "restaurantId",
                select: ["name", "description"]
            });
        return sendResponse(res, true, 200, "Restaurant fetched successfully", getRestaurantFromCategory);

    } catch (err) {
        console.log(err)
    }
};


exports.addToCart = async (req, res, next) => {
    try {
        const addCart = await CartModel.findOne({ userId: req.user.userId });

        // if cart is not present or restaurant selected by user is not same as restaurant present in cart create new cart

        if (!addCart || addCart.restaurantId.toHexString() !== req.body.restaurantId) {
            const getPrice = await DishModel.find({ _id: req.body.dishId });
            const saveCart = await CartModel.create({ ...req.body, userId: req.user.userId });
            saveCart.dishes.push({ dishId: req.body.dishId, quantity: req.body.quantity, totalPrice: getPrice[0].price });
            await saveCart.save();
            return sendResponse(res, true, 200, "Dish added to cart successfully", saveCart);

        }

        // if cart is present and if restaurant and dish selected by user matches with the cart just add the quantity

        if (addCart.restaurantId.toHexString() == req.body.restaurantId) {

            const dish = addCart.dishes.find((d) => d.dishId == req.body.dishId)
            if (dish) {
                dish.quantity += 1
                dish.totalPrice = dish.quantity * dish.totalPrice
                await addCart.save();
                return sendResponse(res, true, 200, "Dish quantity added to existing cart successfully", addCart);

            }


        }

        // if the restaurant selected matches the restaurant in existing cart add the dish in the cart
        const getPrice = await DishModel.find({ _id: req.body.dishId });
        if (addCart.restaurantId.toHexString() == req.body.restaurantId) {
            const saveCart = await CartModel.create({ ...req.body, userId: req.user.userId });
            addCart.dishes.push({ dishId: req.body.dishId, quantity: req.body.quantity, totalPrice: getPrice[0].price });
            await saveCart.save();

            return sendResponse(res, true, 200, "Dish added to existing cart successfully", saveCart);


        }

    } catch (err) {
        console.log(err);
    }
};

exports.getCart = async (req, res, next) => {
    try {
        const getCart = await CartModel.find({ userId: req.user.userId })
            .lean()
            .populate({
                path: 'restaurantId',
                select: ["name", "description"]
            })
            .populate({
                path: 'dishes.dishId',
                select: ["name", "price"]
            })
            .select([
                "dishes.quantity", "dishes.totalPrice"
            ]);

        return sendResponse(res, true, 200, "Cart fetched successfully", getCart)
    } catch (err) {
        console.log(err)
    }

};


exports.getOrders = async (req, res, next) => {
    try {
        const getDetails = await CartModel.find({ userId: req.user.userId })
            .lean()
            .populate({
                path: 'userId',
                select: ["name", "location"]
            })
            .populate({
                path: 'restaurantId',
                select: ["name", "location"]
            })
            .populate({
                path: 'dishes.dishId',
                select: ["name", "price"]
            })
            .select([
                "dishes.quantity", "dishes.totalPrice"
            ])
        console.log(getDetails)

        return sendResponse(res, true, 200, "Orders fectched successfully", getDetails)
    } catch (err) {
        console.log(err)
    }
};