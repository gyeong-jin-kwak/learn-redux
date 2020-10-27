/* Action Type 선언하기 */
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

/* Action 생성함수 작성 */
let nextId= 1;
export const addTodo = text => ({
    type: ADD_TODO,
    todo: {
        id: nextId++,
        text
    }
})

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id
})

/* 초기값 선언 */
const initialState = [
/*
    {
        id: 1,
        text: '예시',
        done: false
    }
 */
];

/* 리듀서를 작성 */
export default function todos (state = initialState, action) {
    switch (action.type){
        case ADD_TODO:
            return state.concat(action.todo)
        case TOGGLE_TODO:
            return state.map(todo =>
                todo.id === action.id ? { ...state, done: !todo.done } : todo
            )
        default:
            return state;
    }
}