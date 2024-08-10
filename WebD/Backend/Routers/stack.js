const { Router } = require("express");
const stackController = require("../Controllers/stack");

const stackRouter = Router();

stackRouter.get("/:id?", (req, res) => {
  const result = new stackController().read(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
stackRouter.post("/create", (req, res) => {
  const result = new stackController().create(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
stackRouter.delete("/delete/:id", (req, res) => {
  const result = new stackController().delete(req.params.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
stackRouter.post("/edit/:id", (req, res) => {
  const { name, colorr } = req.body;

  const result = new stackController().edit(req.params.id, { name, colorr });
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});
stackRouter.put("/change-status/:id/:new_status", (req, res) => {
  const result = new stackController().changeStatus(
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
stackRouter.put("/change-status/:id/:new_status", (req, res) => {
  const result = new stackController().changeStatus(
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
module.exports = stackRouter;
