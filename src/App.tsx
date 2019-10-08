import React from 'react';
import { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from "styled-components";
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext'

const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
body {
background: #e9ecef;
}
`;

// const GlobalStyle: StyledInterface = createGlobalStyle`
// body {
// background: #e9ecef;
// }
// `;

function App() {
  return (
    <>
    <TodoProvider>
      <GlobalStyle/>
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
      </TodoProvider>
    </>
  );
}

export default App;