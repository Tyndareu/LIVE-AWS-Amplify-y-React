import { useState } from "react";
import { Button, Dropdown } from "@rewind-ui/core";

export default function Tasks({
  tasks,
  handleDelete,
  handleDone,
  handlePriority,
}) {
  const [selectedPriority, setSelectedPriority] = useState("all");

  const filterTasksByPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const filteredTasks =
    selectedPriority === "all"
      ? tasks
      : tasks.filter((task) => task.priority === selectedPriority);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-3">
      <div className="flex gap-2 mb-2">
        <Button
          withRing={false}
          color="blue"
          tone={selectedPriority !== "all" ? "outline" : "light"}
          onClick={() => filterTasksByPriority("all")}
        >
          All
        </Button>
        <Button
          withRing={false}
          color="green"
          tone={selectedPriority !== "low" ? "outline" : "light"}
          onClick={() => filterTasksByPriority("low")}
        >
          Low
        </Button>
        <Button
          withRing={false}
          color="yellow"
          tone={selectedPriority !== "medium" ? "outline" : "light"}
          onClick={() => filterTasksByPriority("medium")}
        >
          Medium
        </Button>
        <Button
          withRing={false}
          color="red"
          tone={selectedPriority !== "high" ? "outline" : "light"}
          onClick={() => filterTasksByPriority("high")}
        >
          High
        </Button>
      </div>
      <div
        style={{ width: "100%" }}
        className="flex flex-wrap gap-1 justify-center"
      >
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleDone={handleDone}
            handlePriority={handlePriority}
          />
        ))}
      </div>
    </div>
  );
}

function TaskItem({ task, handleDelete, handleDone, handlePriority }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className="flex flex-wrap"
      key={task.id}
      style={{ height: "fit-content", maxWidth: '48%' }}
    >
      <div
        style={
          task.priority === "high"
            ? { backgroundColor: "#ff000090" }
            : task.priority === "medium"
            ? { backgroundColor: "orange" }
            : { backgroundColor: "green" }
        }
        className="border border-purple-400 rounded-lg w-full p-2"
      >
        <Dropdown className="p-1">
          <Dropdown.Trigger>
            <Button size="sm" color tone="outline">
              {task.priority?.toUpperCase()}
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content onClick={(e) => handlePriority(e, task)}>
            <Dropdown.Item value="low">Low</Dropdown.Item>
            <Dropdown.Item value="medium">Medium</Dropdown.Item>
            <Dropdown.Item value="high">High</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <div style={{ cursor: "pointer" }} onClick={toggleDetails}>
          <hr />
          <h2>{task.name.toUpperCase()}</h2>
          <hr />
          <p>
            {task.dataEnd &&
              `Limit Date: ${task.dataEnd.split("-").reverse().join("/")}`}
          </p>
          {showDetails && (
            <>
              <div>
                <hr />
                <p>{task.description}</p>
              </div>
              <div className="flex gap-1 flex-wrap mt-1 mb-1 justify-center">
                <Button
                  color="green"
                  shadow="md"
                  shadowColor="black"
                  radius="lg"
                  size="sm"
                  onClick={() => handleDone(task)}
                >
                  {task.done ? "Incomplete" : "Complete"}
                </Button>
                <Button
                  color="red"
                  shadow="md"
                  shadowColor="black"
                  radius="lg"
                  size="sm"
                  onClick={() => handleDelete(task)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
