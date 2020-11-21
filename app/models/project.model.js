module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define('project', {
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    startDate: {
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
        
      },
    },
    endDate: {
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
        
      },
    },
    duration: {
      type: Sequelize.STRING,
      validate: {
       
      },
    },
    type: {
      type: Sequelize.STRING,

      validate: {
        isIn: [['mobile', 'web', 'both']],
        notEmpty: true,
      },
    },
  });

  return Project;
};
