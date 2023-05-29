import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const p = document.createElement("p");
        p.innerText = data.message;
        document.body.appendChild(p);
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
