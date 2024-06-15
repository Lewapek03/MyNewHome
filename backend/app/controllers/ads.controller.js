const db = require("../models");
const Ad = db.ads;
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("images", 3); 

exports.create = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading images:", err);
      return res.status(500).send({
        message: "Error uploading images",
      });
    }

    const images = req.files
      ? req.files.map((file) => {
          return `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`;
        })
      : [];

    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.location ||
      !req.body.phoneNumber ||
      !req.body.price ||
      !req.body.creator
    ) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    const ad = {
      title: req.body.title,
      description: req.body.description,
      images: images,
      location: req.body.location,
      published: req.body.published ? req.body.published : false,
      phoneNumber: req.body.phoneNumber,
      price: req.body.price,
      creator: req.body.creator,
      createdAt: new Date(),
    };

    Ad.create(ad)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error("Error creating Ad:", err);
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Ad.",
        });
      });
  });
};

exports.findAll = (req, res) => {
  Ad.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving Ads:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ads.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Ad.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Ad with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.error("Error retrieving Ad:", err);
      res.status(500).send({
        message: err.message || "Error retrieving Ad with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading images during update:", err);
      return res.status(500).send({
        message: "Error uploading images",
      });
    }

    const updateFields = req.body;

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => {
        return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      });
      updateFields.images = images;
    }

    Ad.update(updateFields, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Ad was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Ad with id=${id}. Maybe Ad was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        console.error("Error updating Ad:", err);
        res.status(500).send({
          message: err.message || "Error updating Ad with id=" + id,
        });
      });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Ad.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ad was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Ad with id=${id}. Maybe Ad was not found!`,
        });
      }
    })
    .catch((err) => {
      console.error("Error deleting Ad:", err);
      res.status(500).send({
        message: err.message || "Could not delete Ad with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Ad.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Ads were deleted successfully!` });
    })
    .catch((err) => {
      console.error("Error deleting all Ads:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while removing all ads.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Ad.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving published Ads:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ads.",
      });
    });
};
