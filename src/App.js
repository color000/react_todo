import {useCallback, useRef, useState} from 'react';
import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {


    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '첫번째 리액트 포트폴리오 입니다.',
            checked: true,
        },
        {
            id: 2,
            text: '체크박스와 버튼을 눌러보세요.',
            checked: true,
        },
        {
            id: 3,
            text: '내용을 입력 후 엔터나 추가 버튼을 눌러보세요.',
            checked: false,
        }
    ]);

    const nextId = useRef(4);

    const onInsert = useCallback(text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            setTodos(todos.concat(todo));
            nextId.current += 1;
        }, [todos],
    )

    const onRemove = useCallback(
        id => {
            setTodos(todos.filter(todo => todo.id !== id))
        }, [todos],
    );

    const onToggle = useCallback(
        id => {
            setTodos(
                todos.map(todo =>
                    todo.id === id ? {...todo, checked: !todo.checked} : todo
                )
            )
        }
    )

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert}/>
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
        </TodoTemplate>
    );
}

export default App;
