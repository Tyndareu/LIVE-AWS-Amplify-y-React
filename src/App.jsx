import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function App () {
  const [task, setTask] = useState({
    name: '',
    description: ''
  })
  const [loadData, setLoadData] = useState(false)
  const [tasks, setTasks] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await API.graphql(graphqlOperation(createTodo, { input: task }))
      .then(() => {
        setLoadData(!loadData)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.graphql(graphqlOperation(listTodos))
      setTasks(result.data.listTodos.items)
    }
    fetchData()
  }, [loadData])

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          ></textarea>
          <button>Submit</button>
        </form>
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
