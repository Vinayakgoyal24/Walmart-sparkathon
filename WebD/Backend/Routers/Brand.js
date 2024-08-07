const { Router } = require("express");
const brandController = require("../Controllers/Brand");
const fileUpload = require("express-fileupload");

const brandRouter = Router();

brandRouter.get("/:id?", (req, res) => {
  const result = new brandController().read(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
brandRouter.post(
  "/create",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    const result = new brandController().create(req.body, req.files.image);
    result
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);
brandRouter.delete("/delete/:id", (req, res) => {
  const result = new brandController().delete(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
// brandRouter.post("/edit/:id", (req, res) => {
//   const { name, colorr } = req.body;

//   const result = new brandController().edit(req.params.id, { name, colorr });
//   result
//     .then((success) => {
//       res.send(success);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });
brandRouter.put("/change-status/:id/:new_status", (req, res) => {
  const result = new brandController().changeStatus(
    req.params.id,
    req.params.new_status
  );
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
brandRouter.put("/change-status/:id/:new_status", (req, res) => {
  const result = new brandController().changeStatus(
    req.params.id,
    req.params.new_status
  );
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = brandRouter;
