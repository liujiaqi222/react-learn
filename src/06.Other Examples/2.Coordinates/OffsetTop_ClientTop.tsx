import { useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("offsetTop", ref.current?.offsetTop);
    console.log("clientTop", ref.current?.clientTop);
  }, []);

  return (
    <div>
      <div
        style={{
          position: "relative",
          margin: "100px",
          padding: "200px",
          border: "1px solid blue",
        }}
      >
        <div
          id="box"
          ref={ref}
          style={{
            border: "20px solid #000",
            width: "100px",
            height: "100px",
            background: "pink",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
