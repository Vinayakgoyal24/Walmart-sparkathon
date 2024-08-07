const Brand = require("../Models/Brand");

class brandController {
  read(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let colors = [];
        if (id) {
          colors = await Brand.findById(id);
        } else {
          colors = await Brand.find();
        }
        resolve({
          msg: "Data fetched successfully",
          status: 1,
          data: colors,
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

create (data, image) {
  return new Promise((resolve, reject) => {
    // Generate a unique image name
    const imageName = new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + "_" + image.name;
    const destination = "./Public/Images/Product/" + imageName;

    // Move the image to the destination
    image.mv(destination, (err) => {
      if (err) {
        return reject({
          msg: "Error while uploading image",
          status: 0,
          error: err.message,
        });
      } else {
        // Create a new Brand
        const brand = new Brand({
          name: data.name,
          slug: data.slug,
          image: imageName,
          category_id: data.category,
        });

        // Save the brand to the database
        brand.save()
          .then((savedBrand) => {
            resolve({
              msg: "Brand added successfully",
              status: 1,
              data: savedBrand, // Use savedBrand to pass the actual saved data
            });
          })
          .catch((err) => {
            reject({
              msg: "Error adding Brand",
              status: 0,
              error: err.message,
            });
          });
      }
    });
  });
};


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
        console.log(data);
        let color = await Brand.findByIdAndUpdate(
          id,
          {
            name: data.name,
            colorr: data.colorr,
          },
          { new: true }
        )
          .then((success) => {
            resolve({
              msg: "Brand updated successfully",
              status: 1,
              data: { name: success.name, colorr: success.colorr },
            });
          })
          .catch((err) => {
            reject({
              msg: "Error updating Brand",
              status: 0,
              error: err.message,
            });
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
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Brand.findByIdAndDelete(id)
          .then(
            resolve({
              msg: "Category deleted",
              status: 1,
            })
          )
          .catch((error) => {
            reject({
              msg: "Error while deleting category",
              status: 0,
              error: error.message,
            });
          });
      } catch (error) {
        reject({
          msg: "internal error while deleting category",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  changeStatus(id, new_status) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Brand.updateOne({ _id: id }, { status: new_status })
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
}
module.exports = brandController;
