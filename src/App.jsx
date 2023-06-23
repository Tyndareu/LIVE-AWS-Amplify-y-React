import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Tasks from "./components/Tasks";
import FormTask from "./components/FormTask";
import Header from "./components/Header";
import ButtonViews from "./components/ButtonViews";

function App({ signOut, user }) {
  const [task, setTask] = useState({
    name: '',
    description: '',
    userMail: user.attributes.email,
    done: false,
  });
  const [loadData, setLoadData] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    setSubmitError(null)
    e.preventDefault();
    await API.graphql(graphqlOperation(createTodo, { input: task }))
      .then(() => {
        setLoadData(!loadData);
      })
      .catch((err) => setSubmitError(err.errors[0].message))
  };

  const handleDelete = async (task) => {
    console.log(task.id);
    try {
      await API.graphql(
        graphqlOperation(deleteTodo, { input: { id: task.id } })
      );
      setLoadData(!loadData);
    } catch (err) {
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

      setLoadData(!loadData);
    } catch (err) {
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
      <ButtonViews setDone={setDone} done={done} />
      <FormTask handleSubmit={handleSubmit} setTask={setTask} task={task} /> 
      {submitError && <p>{submitError}</p>}
      <Tasks
        tasks={tasks}
        handleDelete={handleDelete}
        handleDone={handleDone}
      />
    </>
  );
}

export default withAuthenticator(App);
