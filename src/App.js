import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelloWorld from "./components/accountBox/HelloWorld";
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AccountBox />} />
          <Route exact path="/hello" element={<HelloWorld />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
