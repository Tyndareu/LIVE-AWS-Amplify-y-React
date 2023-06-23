
export default function ButtonViews({done, setDone}) {
  return (
    <button onClick={() => setDone(!done)}>
    {done ? "View Incomplete Tasks" : "View Completed Tasks"}
  </button>
  )
}
