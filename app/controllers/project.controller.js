const db = require('../models');
const Project = db.project;
const Freelancer = db.freelancer;
const Op = db.Sequelize.Op;

// Create and Save a new Project
exports.create = (req, res) => {
  return Project.create({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    duration: req.body.duration,
    type: req.body.type,
  })
    .then((project) => {
      console.log('>> Created Project: ' + JSON.stringify(project, null, 4));
      return res.json(project);
    })
    .catch((err) => {
      console.log('>> Error while creating project: ', err);
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Project.findAll()
    .then((projects) => {
      return res.json(projects);
    })
    .catch((err) => {
      console.log('>> Error while retrieving Projects: ', err);
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Project.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Project was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Project with id=' + id,
      });
    });
};

// Delete a Project if it hasn't started
exports.delete = (req, res) => {
  const id = req.params.id;
  Project.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Project was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot Project  with id=${id}. Maybe Project was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not Project  with id=' + id,
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id, {
    include: [
      {
        model: Freelancer,
        as: 'freelancer',
        attributes: [
          'name',
          'phoneNumber',
          'address',
          'website',
        ],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((project) => {
      return res.json(project);
    })
    .catch((err) => {
      console.log('>> Error while finding Project: ', err);
    });
};
