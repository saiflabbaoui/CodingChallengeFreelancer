const { validationResult } = require('express-validator');
const db = require("../models");
const Freelancer = db.freelancer;
const Project = db.project;
const Op = db.Sequelize.Op;

// Create and Save a new Freelancer
exports.create = (req, res) => {
    // Validate request
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // checck email
    Freelancer.findOne({ where: { email: req.body.email } }).then((data) => {
      console.log(data);
      if (data !== null) {
        return res.status(400).json({ errors: [{ msg: 'email already exisi' }] });
      }
      // Create a Freelancer
      const freelancer = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        website: req.body.website,
      };
      // Save Freelancer in the database
      Freelancer.create(freelancer)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              'Some error occurred while creating the Freeelancer.',
          });
        });
    });
  };
  
  // Retrieve all Freelancers & Projects from the database.
  exports.findAll = (req, res) => {
    Freelancer.findAll({
      include: [
        {
          model: Project,
          as: 'project',
          attributes: [
            'id',
            'name',
            'startDate',
            'endDate',
            'duration',
            'type'
          ],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((freelancers) => {
        return res.json(freelancers);
      })
      .catch((err) => {
        console.log('>> Error while retrieving Freelancers: ', err);
      });
  };
  exports.findById = (req, res) => {
    const id = req.params.id;
    Freelancer.findByPk(id, {
      include: [
        {
          model: Project,
          as: 'project',
          attributes: [
            'id',
            'name',
            'startDate',
            'endDate',
            'duration',
            'type'
          ],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((freelancer) => {
        return res.json(freelancer);
      })
      .catch((err) => {
        console.log('>> Error while finding Freelancers: ', err);
      });
  };
  
  exports.update = (req, res) => {
    const { freelancerId, projectId } = req.body;
    Freelancer.findByPk(freelancerId)
      .then((freelancer) => {
        if (!freelancer) {
          res.status(400).send({
            message: 'Freelancer not found!',
          });
          return res;
        }
  
        return Project.findByPk(projectId).then((project) => {
          if (!freelancer) {
            res.status(400).send({
              message: 'project not found!',
            });
            return res;
          }
  
          freelancer.addProject(project);
  
          return res.json(freelancer);
        });
      })
      .catch((err) => {
        console.log('>> Error while adding Project to Freelancer: ', err);
      });
  };