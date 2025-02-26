import { useEffect, useReducer } from "react";

interface Action {
  num: number;
  type: 'add'|'minus'
}

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'add':
      return state + action.num
    case 'minus':
      return state - action.num    // 修复减法操作
    default:
        return state;
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, 0);
  useEffect(() => {
    const timer = setInterval(() => {   // 保存定时器引用
      dispatch({type:'add',num:1})
    },1000)
    
    return () => clearInterval(timer);   // 清理定时器
  }, [])
  return <div>{count}</div>;
}


export default App