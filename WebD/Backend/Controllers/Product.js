const Product = require("../Models/Product");
const Category = require("../Models/Category");
const Color = require("../Models/Colors");
const Brand = require("../Models/Brand");
class productController {
  create(data, image) {
    return new Promise((resolve, reject) => {
      try {
        const imageName =
          new Date().getTime() + Math.random() * 10 + image.name;
        const destination = "./Public/Images/Product/" + imageName;
        image.mv(destination, (err) => {
          if (err) {
            reject({
              msg: "Error while uploading image",
              status: 0,
              error: err.message,
            });
          } else {
            const product = new Product({
              name: data.name,
              slug: data.slug,
              price: data.price,
              discount_percent: data.discount_percent,
              discount_price: data.discount_price,
              image: imageName,
              category_id: data.category,
              brand_id: data.brand,
              stack_id:data.stack,
              // color: JSON.parse(data.color),
            });
            product
              .save()
              .then(() => {
                resolve({
                  msg: "Product added successfully",
                  status: 1,
                  data: product,
                });
              })
              .catch(() => {
                reject({
                  msg: "Error while adding product",
                  status: 0,
                });
              });
          }
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  read(id, query) {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(query.category_slug);
        const dbQuery = {};
        if (query.category_slug) {
          const category = await Category.findOne({
            slug: query.category_slug,
          });
          if (category != null) {
            dbQuery.category_id = category._id;
          }
        }
        if (query.brand_slug) {
          const brand = await Brand.findOne({
            slug: query.brand_slug,
          });
          if (brand != null) {
            dbQuery.brand_id = brand._id;
          }
        }
        // if (query.color_id) {
        //   const color = await Color.findOne({
        //     // dbQuery.color = color._id;
        //   });
        //   if (brand != null) {
        //     dbQuery.brand_id = brand._id;
        //   }
        // }
        // if (query.brand_slug) {
        //   const brand = await Category.findOne({
        //     slug: query.brand_slug,
        //   });
        //   if (brand != null) {
        //     dbQuery.brand_id = brand._id;
        //   }
        // }

        // if(query.color_id != "null"){
        //   const color = await Color.findById(query.color_id);
        //   if(color != null)
        //   {
        //     dbQuery.color = color._id;
        //   }
        // }
        // console.log(dbQuery)
        let product = [];
        if (id) {
          product = await Product.findById(id).populate([
            "category_id",
            "brand_id",
            // "stack_id",
            // "color",
          ]);
        } else {
          if (query.limit != 0) {
            product = await Product.find(dbQuery)
              .populate(["category_id", "brand_id"])
              .limit(query.limit);
          } else {
            product = await Product.find(dbQuery).populate([
              "category_id",
              "brand_id",
            ]);
          }
        }
        resolve({
          product: product,
          status: 1,
          imageBaseUrl: "/Images/Product/",
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  update(id, data) {
    return new Promise((resolve, reject) => {
      try {
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  edit(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await Product.findByIdAndUpdate(id, data, { new: true });
        resolve({
          msg: "Product updated successfully",
          status: 1,
          data: product,
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      try {
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  changeStatus(id, new_status) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Product.updateOne({ _id: id }, { status: new_status })
          .then(
            resolve({
              msg: "Status changed",
              status: 1,
            })
          )
          .catch((error) => {
            reject({
              msg: "Error while changing status",
              status: 0,
              error: error.message,
            });
          });
      } catch (error) {
        reject({
          msg: "internal error while changing status",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  changeBestsellerStatus(id, new_status) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Product.updateOne(
          { _id: id },
          { best_seller: new_status }
        )
          .then(
            resolve({
              msg: "Status changed",
              status: 1,
            })
          )
          .catch((error) => {
            reject({
              msg: "Error while changing status",
              status: 0,
              error: error.message,
            });
          });
      } catch (error) {
        reject({
          msg: "internal error while changing status",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  readBest(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = [];
        if (id) {
          product = await Product.findById(id).populate([
            "category_id",
            "color",
          ]);
        } else {
          product = await Product.find({ best_seller: true }).populate([
            "category_id",
            "color",
          ]);
        }
        resolve({
          product: product,
          status: 1,
          imageBaseUrl: "/Images/Product/",
        });
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
}

module.exports = productController;
