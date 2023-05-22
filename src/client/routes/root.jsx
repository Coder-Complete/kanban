import { useEffect, useState } from "react";

export default function Root() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div id="root-layout">
        root
        <p>{data.message}</p>
      </div>
    </>
  );
}
