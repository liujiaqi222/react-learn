import React, { ChangeEvent, useState } from 'react'


export const UnControlledMode = () => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input type="text" onChange={onChange} defaultValue='hello world' />;
};

export const ControlledMode = () => {
  const [value,setValue] = useState('hello...')
  return <input type="text" value={value} onChange={(e)=>setValue(e.target.value.toUpperCase())}/>
}



const index = () => {
  return (
    <div>
      <div>
        <UnControlledMode/>
      </div>
      <div>
        <ControlledMode/>
      </div>
    </div>
  );
}



export default index