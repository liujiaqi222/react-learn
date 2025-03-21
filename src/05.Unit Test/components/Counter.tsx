import { useState } from "react"

const Counter = () => {
  const [count,setCount] = useState(0)
  return (
    <div>
      <p data-testid='counter-value'>{count}</p>
      <button onClick={()=>setCount(pre=>pre+1)}>increment</button>
    </div>
  )
}

export default Counter