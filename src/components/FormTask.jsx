export default function FormTask({ handleSubmit, setTask, task }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Add Task</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          margin: "auto",
        }}
      >
        <input
          value={task.name}
          type="text"
          placeholder="name"
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <textarea
          value={task.description}
          rows="5"
          placeholder="description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>

        <button disabled={task.name.length === 0 || task.description.length === 0}>Submit</button>
      </form>
    </div>
  );
}
