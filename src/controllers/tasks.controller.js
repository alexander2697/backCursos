import { Task } from "../models/Task.js";
import { Project } from "../models/Project.js"

export const createTask = async (req, res) => {
  try {
    const { name, done, projectId } = req.body;

    const newTask = await Task.create({
      name,
      done,
      projectId,
    });

    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      where: { id },
      attributes: ["name"], //Esto declara que campos se van a visualizar
    });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findOne({
            where: {id}
        })
        task.set(req.body)      //sirve para actualizar solo el campo que se quiere actualizar son cambiar todos
        await task.save()
        return res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task does not exist" }); 
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params
  try {
    const result = await Task.destroy({
      //destroy sirve para buscar y eliminar
      where: { id },
    });
    console.log(result);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
