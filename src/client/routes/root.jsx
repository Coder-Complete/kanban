import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="root-layout">root</div>
    </>
  );
}
