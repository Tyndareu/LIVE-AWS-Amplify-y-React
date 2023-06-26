import { Button } from "@rewind-ui/core";

export default function ButtonNewTask({ setNewTask, newTask }) {
  return (
    <Button
      size="sm"
      style={{ marginLeft: 10 }}
      onClick={() => setNewTask(!newTask)}
      color="blue"
      shadow="md"
    >
      {newTask ? "Close" : "New Task"}
    </Button>
  );
}
