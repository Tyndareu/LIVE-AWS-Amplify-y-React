import { Button } from "@rewind-ui/core";

export default function ButtonViews({ done, setDone, setNewTask, setTasks }) {
  return (
    <Button
      size="sm"
      onClick={() => { setTasks([]);setDone(!done);setNewTask(false) }}
      color="blue"
      shadow="md"
    >
      {done ? "View Incomplete Tasks" : "View Completed Tasks"}
    </Button>
  );
}
