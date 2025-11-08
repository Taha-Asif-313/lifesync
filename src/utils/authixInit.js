import { NeuctraAuthix } from "@neuctra/authix";
import toast from "react-hot-toast";

const authix = new NeuctraAuthix({
  baseUrl: "https://server.authix.neuctra.com/api",
  apiKey: "850a8c32c35f008d28295f065526825a656af0a784ea7b0910fc2a1f748adda3",
  appId: "a87364a41d499ab45654df580fd32d6c",
});
const user = JSON.parse(localStorage.getItem("userInfo"));

export const CreateTask = async (task) => {
  try {
    const createdTask = await authix.addUserData({
      userId: user.id,
      data: task,
    });
    console.log(createdTask);

    return createdTask.data; // return so the caller can use it
  } catch (err) {
    console.log(err);
    toast.error(err.message);
    throw err; // optional: rethrow if you want the caller to handle it
  }
};

export const GetAllTasks = async () => {
  try {
    const allTasks = await authix.getUserData({
      userId: user.id,
    });

    console.log("All tasks:", allTasks);
    return allTasks.data; // return so it can be used elsewhere
  } catch (err) {
    console.error("Error fetching tasks:", err);
    toast.error(err.message || "Failed to fetch tasks.");
    throw err; // optional: rethrow for external error handling
  }
};

export const DeleteTask = async (taskId) => {
  try {
    const deletedTask = await authix.deleteUserData({
      userId: user.id,
      dataId: taskId, // usually Authix uses `dataId` or similar to identify a record
    });

    console.log("Deleted task:", deletedTask);
    toast.success("Task deleted successfully!");
    return deletedTask;
  } catch (err) {
    console.error("Error deleting task:", err);
    toast.error(err.message || "Failed to delete task.");
    throw err;
  }
};

export const CompleteTask = async (taskId) => {
  try {
    const updatedTask = await authix.updateUserData({
      userId: user.id,
      dataId: taskId, // ID of the task to update
      data: {
        completed: true, // mark as completed
      },
    });

    console.log("Task completed:", updatedTask);
    toast.success("Task marked as completed!");
    return updatedTask;
  } catch (err) {
    console.error("Error completing task:", err);
    toast.error(err.message || "Failed to complete task.");
    throw err;
  }
};
