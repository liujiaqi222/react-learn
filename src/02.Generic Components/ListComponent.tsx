import { ReactNode } from "react"

type ListProps<T> = {
  items: T[]
  renderItem:(item:T,index:number)=>ReactNode
}


const List =<T,>({items,renderItem}:ListProps<T>) => {
  
  return <ul>
    {items.map((item, index) => <li key={index}>{renderItem(item,index)}</li>)}
  </ul>
}

const StringItems = List({ items: ['a', 'b', 'c'], renderItem: (item, index) => <p key={index}>{item}</p> })


const NumberItems = List({ items: [1,2,3], renderItem: (item, index) => <strong key={index}>{item}</strong> });



const ListComponent = () => {
  return (
    <>
      <div>{StringItems}</div>

      <div>{NumberItems}</div>
    </>
  );
}

export default ListComponent