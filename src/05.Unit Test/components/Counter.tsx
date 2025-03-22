import { useCounter } from "./hooks/useCounter"

const Counter = () => {
  const {count,increment }  = useCounter()
  return (
    <div>
      <p data-testid='counter-value'>{count}</p>
      <button onClick={increment}>increment</button>
    </div>
  )
}

export default Counter