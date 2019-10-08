import React, {
    useState,
    MutableRefObject,
    FormEvent,
    EventHandler,
    MouseEventHandler,
    ChangeEventHandler, ReactElement,
} from 'react';
import styled, { css, StyledComponent } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId, TodoDispatch } from '../TodoContext';

const CircleButton: StyledComponent<"div", {}, { children: ReactElement; onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; open: boolean; }, never> = styled.div`
background: #38d9a9;
&:hover {
    background: #63e6be;
}
&:active {
    background: #20c997;
}

z-index: 5;
cursor: pointer;
width: 80px;
height: 80px;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
left: 50%;
bottom: 0px;
transform: translate(-50%, 50%);

font-size: 60px;
color: white;
border-radius: 40px;

border: none;
outline: none;

transition: 0.125s all ease-in;

${open => open && css`
background: #ff6b6b;
&:hover {
    background: #ff8787;
}
&:active {
    background: #fa5252;
}
transform: translate(-50%, 50%) rotate(45deg);
`}
`;
//div definition
const InsertFormPositioner: StyledComponent<"div", {}, {}, never> = styled.div`
width: 100%;
bottom: 0;
left: 0;
position: absolute;
`;

const InsertForm: StyledComponent<"form", {}, {}, never> = styled.form`
background: #f8f9fa;
padding: 32px;
padding-bottom: 72px;
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
border-top: 1px solid #e9ecef;
`;

const Input: StyledComponent<"input", {}, {}, never> = styled.input`
padding: 12px;
border-radius: 4px;
border: 1px solid #dee2e6;
width: 100%;
outline: none;
font-size: 18px;
box-sizing: border-box;
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const onToggle: MouseEventHandler<HTMLDivElement> = () => setOpen(!open);
    const onChange: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const onSubmit: EventHandler<FormEvent> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: "CREATE",
            todo: [
                {
                    id: nextId.current,
                    text: value,
                    done: false,
                },
            ],
        });
        setValue("");
        setOpen(false);
        nextId.current += 1;
    };

    const dispatch: TodoDispatch = useTodoDispatch();
    const nextId: MutableRefObject<number> = useTodoNextId();

    return (
        <React.Fragment>
            {open && (<InsertFormPositioner>
                <InsertForm onSubmit={onSubmit}>
                    <Input placeholder="할일 입력 후 엔터 "
                           autoFocus
                           onChange={onChange}
                           value={value}/>
                </InsertForm>
            </InsertFormPositioner>)}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd/>
            </CircleButton>
        </React.Fragment>
    )
}

export default React.memo(TodoCreate);