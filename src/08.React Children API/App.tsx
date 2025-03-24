import React, { PropsWithChildren } from "react";

const Container = (props: PropsWithChildren) => {
  const { children } = props;
  const arr = React.Children.toArray(children)
  console.log(arr.sort())

  return (
    <div className="container">
      {React.Children.map(children, (item) => (
        <div className="rounded border bg-pink-200">{item}</div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div className="p-2 w-20">
      <Container>
        <a href="#">111</a>
        <a href="#">222</a>
        <a href="#">333</a>
      </Container>
    </div>
  );
};

export default App;
