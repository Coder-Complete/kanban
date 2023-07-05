import { useEffect, useState } from "react";

export default function Root() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_URL);
    // fetch("http://127.0.0.1:5005")
    fetch(import.meta.env.VITE_BACKEND_URL)
      .then((res) => res.json())
      .then((dataRows) => {
        console.log(dataRows);
        setBoards(dataRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="root-layout">
        <h1>Boards</h1>
        {boards.map((board) => (
          <p key={Math.random()}>{board.name}</p>
        ))}
      </div>
    </>
  );
}
