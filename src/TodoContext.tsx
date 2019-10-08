import React, {
    Context,
    createContext,
    Reducer,
    useContext,
    useReducer,
    useRef,
    MutableRefObject, Dispatch, ReducerAction,
} from 'react';

export type Todo = {
    id: number,
    text: string,
    done: boolean,
}

export type TodoActions =
    { type: 'TOGGLE', id: number }
    | { type: 'CREATE', todo: TodoState }
    | { type: 'REMOVE', id: number }

export type TodoState = Todo[]

const initialTodos: TodoState = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링 하기',
        done: true,
    },
    {
        id: 3,
        text: '컨텍스트 만들기',
        done: false,
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false,
    },
];

/*
Create Toggle Remove
*/
function todoReducer(state: TodoState, action: TodoActions) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo => todo.id === action.id ?
                {...todo, done: !todo.done} : todo);
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type`);
    }
}

const TodoStateContext: Context<TodoState> = createContext<TodoState>({} as TodoState);
const TodoDispatchContext: Context<TodoDispatch> = createContext<TodoDispatch>({} as TodoDispatch);
const TodoNextIdContext: Context<MutableRefObject<number>> = createContext<MutableRefObject<number>>({} as MutableRefObject<number>);

interface TodoProviderProps {
    children: React.ReactNode;
}

// interface TodoDispatch {
//     dispatch(): React.Dispatch<TodoActions> = (value: TodoActions) => void
// }

 // type TodoDispatch<TodoActions> = (value: TodoActions) => void;
export type TodoDispatch = Dispatch<ReducerAction<Reducer<TodoState, TodoActions>>>

export function TodoProvider(props: TodoProviderProps) {
    //const [state, dispatch] = useReducer<Reducer<TodoState, TodoActions>>(todoReducer, initialTodos);
    // Dispatch<ReducerAction<Reducer<TodoState, TodoActions>>
    const [state, dispatch] = useReducer<Reducer<TodoState, TodoActions>>(todoReducer, initialTodos);
    const nextId: MutableRefObject<number> = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {props.children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState(): TodoState {
    const todoState: TodoState = useContext<TodoState>(TodoStateContext);
    if (!todoState) {
        throw new Error("cannot fine context");
    }

    return todoState;
}

export function useTodoDispatch() {
    const dispatch: TodoDispatch = useContext(TodoDispatchContext);
    if (!dispatch) {
        throw new Error("cannot fine context");
    }

    return dispatch;
}

export function useTodoNextId() {
    const id: MutableRefObject<number> = useContext(TodoNextIdContext);
    if (!id) {
        throw new Error("cannot fine context");
    }

    return id;
}
