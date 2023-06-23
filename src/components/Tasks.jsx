export default function Tasks({ tasks , handleDelete, handleDone }) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{ width: 300, border: "1px solid black", margin: "10px" }}
        >
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          <p>{task.done && "Done"}</p>
          <p>
            Creation date:{" "}
            {task.createdAt.split("T")[0].split("-").reverse().join("/")}
          </p>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <button onClick={() => handleDone(task)}>
              {task.done ? "Undone" : "Done"}
            </button>
            <button onClick={() => handleDelete(task)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
