import { useEffect, useState } from "react";

export default function Root() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((dataRows) => {
        console.log(dataRows);
        setTasks(dataRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="root-layout">
        <h1>Tasks</h1>
        {tasks.map((task) => (
          <p key={Math.random()}>{task.something_else}</p>
        ))}
      </div>
    </>
  );
}
