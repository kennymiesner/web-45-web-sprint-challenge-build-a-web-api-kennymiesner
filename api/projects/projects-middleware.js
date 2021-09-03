const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if (!project) {
      res.status(404).json({
        message: 'Project with the specified id does not exist'
      })
    } else {
      req.project = project 
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem finding project'
    })
  }
}

function validateProject(req, res, next) {
  const { name, description } = req.body
  if (
    !name || !name.trim() ||
    !description || !description.trim()
  ) {
    res.status(400).json({
      message: 'Please include all required name, description, or completed fields' })
  } else {
    req.name = name.trim()
    req.description = description.trim()
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject,
}