import React from 'react';
import styled, { StyledComponent } from 'styled-components'

const TodoTemplateblock: StyledComponent<"div", {}, {}, never> = styled.div`
width: 512px;
height:768px;

position: relative;
background: white;
border-radius: 16px;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

margin: 0 auto;
margin-top: 96px;
margin-bottom: 32px;

display: flex;
flex-direction: column;
`
interface TodoTemplateProps {
    children: React.ReactNode;
}

function TodoTemplate(props: TodoTemplateProps) {
    return (
        <TodoTemplateblock>{props.children}</TodoTemplateblock>
    )
}

export default TodoTemplate;