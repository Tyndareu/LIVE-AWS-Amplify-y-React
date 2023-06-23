import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Tasks from "./components/Tasks";
import FormTask from "./components/FormTask";
//import {  FormTask  } from './ui-components';
import Header from "./components/Header";
import ButtonViews from "./components/ButtonViews";
import toast, { Toaster } from "react-hot-toast";
import ButtonNewTask from "./components/ButtonNewTask";

function App({ signOut, user }) {
  const initialValues = {
    name: "",
    description: "",
    userMail: user.attributes.email,
    done: false,
    priority: "low",
  };
  const [task, setTask] = useState(initialValues);
  const [loadData, setLoadData] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(false);
  const [newTask, setNewTask] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    task.userMail = user.attributes.email;
    await API.graphql(graphqlOperation(createTodo, { input: task }))
      .then(() => {
        toast.success("Created!");
        setTask(initialValues);
        setNewTask(false);
        done && setDone(false);
        console.log(done);
        setLoadData(!loadData);
      })
      .catch((err) => {
        toast.error("Updated Error!" + err.errors[0].message);
      });
  };

  const handleDelete = async (task) => {
    console.log(task.id);
    try {
      await API.graphql(
        graphqlOperation(deleteTodo, { input: { id: task.id } })
      );
      toast.success("Deleted!");
      setLoadData(!loadData);
    } catch (err) {
      toast.error("Deleted Error!");
      console.log(err);
    }
  };
  const handleDone = async (task) => {
    try {
      const input = {
        id: task.id,
        done: !task.done,
      };
      await API.graphql(graphqlOperation(updateTodo, { input }));
      toast.success("Updated!");
      setLoadData(!loadData);
    } catch (err) {
      toast.error("Updated Error!");
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filter = {
          userMail: {
            eq: user.attributes.email,
          },
          done: {
            eq: done,
          },
        };
        const result = await API.graphql(
          graphqlOperation(listTodos, { filter })
        );
        setTasks(result.data.listTodos.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [done, loadData, user.attributes.email]);

  return (
    <>
      <Header signOut={signOut} mail={user.attributes.email} />
      <ButtonViews setDone={setDone} done={done} setNewTask={setNewTask} setTasks={setTasks}/>
      <ButtonNewTask setNewTask={setNewTask} newTask={newTask} />
      {newTask && (
        <FormTask handleSubmit={handleSubmit} setTask={setTask} task={task} />
      )}
      {!newTask && (
        <Tasks
          tasks={tasks}
          handleDelete={handleDelete}
          handleDone={handleDone}
        />
      )}
      <Toaster />
    </>
  );
}

export default withAuthenticator(App);
