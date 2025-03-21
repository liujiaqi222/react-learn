function Greeting({ name }: {name?:string}) {
  return <h1>Hello, {name || "World"}!</h1>;
}

export default Greeting;
