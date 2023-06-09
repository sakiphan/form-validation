import React from "react";
import "./App.css";
import Header from "./components/shared/Header";
import Input from "./components/shared/Input";

const App = () => {
  return (
    <div className="app">
      <Header logoTitle="React" navbarItem={["Auth", "Settings", "Product"]} />
      <Input errorTitle="Please fill in the blanks!"/>
    </div>
  );
};

export default App;
