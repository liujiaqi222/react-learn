import { MouseEventHandler, useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const top = ref.current!.getBoundingClientRect().top;
    console.log("box pageY", e.pageY);
    console.log("box clientY", e.clientY);
    console.log("box offsetY", e.pageY-window.scrollY-top);
    console.log("box screenY", e.screenY);
  };

  useEffect(() => {
    document.getElementById("box")!.addEventListener("click", (e) => {
      console.log("box2 pageY", e.pageY);
      console.log("box2 clientY", e.clientY);
      console.log("box2 offsetY", e.offsetY);
      console.log("box2 screenY", e.screenY);
    });
  }, []);

  return (
    <div>
      <div
        id="box"
        ref={ref}
        style={{
          marginTop: "800px",
          width: "100px",
          height: "100px",
          background: "blue",
        }}
        onClick={clickHandler}
      ></div>
    </div>
  );
}

export default App;
