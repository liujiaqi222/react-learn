import { produce } from "immer";
import {useReducer } from "react";


type Data = {
  result:number
}

type Action = {
  type: "add" | "sub",
  value:number
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      return produce(state, (state) => {
        state.result += action.value;
      });
    case "sub":
      return { result: state.result - action.value };
    default:
      return state;
  }
}

function App() {
  const [state,dispatch]  = useReducer(reducer,{result:0});
  return (
    <div>
      <h1>{state.result}</h1>
      <button onClick={() => dispatch({ type: "add", value: 1 })}>Add</button>
      <button onClick={() => dispatch({ type: "sub", value: 1 })}>Sub</button>
    </div>
  );
}

export default App;