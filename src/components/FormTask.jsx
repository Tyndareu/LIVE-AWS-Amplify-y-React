import { Button, Input, Textarea, Select } from "@rewind-ui/core";

export default function FormTask({ handleSubmit, setTask, task }) {
  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className="mb-1">Add Task</h1>
      <form
        onSubmit={(e) => {handleSubmit(e)}}
        className="flex flex-col items-center m-auto gap-1"
      >
        <Input
          value={task.name}
          type="text"
          placeholder="name"
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <Textarea
          value={task.description}
          rows="5"
          placeholder="description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></Textarea>
        <div className="flex gap-14 items-center">
          <p>Priority</p>
          <Select
            style={{ width: 200 }}
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
        <div className="flex gap-8 items-center">
          <p>Date Limit: </p>
          <Input
            onChange={(e) => setTask({ ...task, dataEnd: e.target.value })}
            style={{ width: 200 }}
            type="date"
            placeholder="date"
          />
        </div>

        <Button color="green" shadow="base" radius="lg"
          type="submit"
          disabled={task.name.length === 0 || task.description.length === 0}
          className="mt-2 mb-1 w-full"
        >
          Submit
        </Button>
      </form>
      <Button color="purple"shadow="base" radius="lg"
        className="w-80"
        onClick={() => {
          setTask({ ...task, name: "", description: "" });
        }}
        disabled={task.name === "" && task.description === ""}
      >
        Clear
      </Button>
    </div>
  );
}
