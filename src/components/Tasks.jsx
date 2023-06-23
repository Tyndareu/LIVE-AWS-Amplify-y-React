import { Button } from "@rewind-ui/core";
export default function Tasks({ tasks, handleDelete, handleDone }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-3">
      {tasks.map((task) => (
        <div className="flex flex-col" key={task.id}>
          <div
            style={
              task.priority === "high"
                ? { backgroundColor: "#ff000050" }
                : task.priority === "medium"
                ? { backgroundColor: "#ffff0050" }
                : { background: "#00ff0050" }
            }
            className="w-80 p-2 border border-purple-400 rounded-lg"
            
          >
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p>{task.done && "Done"}</p>
            <p>Priority: {task.priority} </p>
            <p>
              {" "}
              {task.dataEnd &&
                `Limit Date: ${task.dataEnd.split("-").reverse().join("/")}`}
            </p>
            <p>
              Creation date:{" "}
              {task.createdAt.split("T")[0].split("-").reverse().join("/")}
            </p>
          </div>
          <div className="flex gap-2 mt-1 justify-center">
            <Button
              color="green"
              shadow="md"
              shadowColor="black"
              radius="lg"
              size="sm"
              onClick={() => handleDone(task)}
            >
              {task.done ? "Incompleted" : "Completed"}
            </Button>
            <Button
              color="red"
              shadow="md"
              shadowColor="black"
              radius="lg"
              size="sm"
              onClick={() => handleDelete(task)}
            >
              Delete{" "}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
