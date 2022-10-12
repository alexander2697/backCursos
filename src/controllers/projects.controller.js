import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

//ESTA FUNCION SE ENCARGA DE BUSCAR LOS DATOS DE UNA TABLA
//RECIBE LOS PARAMETROS...
//DEVUELVE TODOS LOS DATOS DE LA TABLA
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    console.log(projects);
    res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//ESTA FUNCION SE ENCARGA DE BUSCAR REGISTROS POR ID EN UNA TABLA
//RECIBE LOS PARAMETROS...id
//DEVUELVE la busqueda por id
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//ESTA FUNCION SE ENCARGA DE CREAR UN REGISTRO
//RECIBE LOS PARAMETROS...name, priority, description
//AGREGA UN NUEVO REGISTRO A LA TABLA
export const createProject = async (req, res) => {
  const { name, priority, description } = req.body;

  try {
    const newProject = await Project.create({
      name,
      description,
      priority,
    });

    res.json(newProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//ESTA FUNCION SE ENCARGA DE ACTUALIZAR DATOS DE UNA TABLA
//RECIBE LOS PARAMETROS...name, priority, description
//DEVUELVE LOS DATOS ACTUALIZADOS
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;

    const project = await Project.findByPk(id);
    project.name = name;
    project.priority = priority;
    project.description = description;

    await project.save();

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//ESTA FUNCION SE ENCARGA DE ELIMINAR UN REGISTRO
//RECIBE LOS PARAMETROS...id
//ELIMINA UN REGISTRO A LA TABLA
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//obtener todas las tareas que pertenecen a un proyecto
export const getProjectTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.findAll({
      where: { projectId: id },
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
