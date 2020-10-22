# Redux 실습 _ FastCamp

## Redux 를 사용할 때 꼭 지켜야 할 세가지
1. 한 application에 store는 하나여야 한다. 
2. 상태는 읽기전용이다. **불변성**을 지켜주어야 한다.
    * spread 연산자를 사용해서 객체가 복사해서 특정 값을 덮어 씌워야 한다.
    * 배열의 경우 **push, splice, reverse 같은 함수 x / concat, filter, map, slice o**
3. 변화를 일으키는 reducer는 **순수한 함수**여야 한다.
    * 동일한 input, 동일한 output이 나와야 한다. 
    * new Date(), Math.random(), axios.get() - x 처럼 **매번 값이 다르게 나오는 함수는 사용하면 안된다.**
    
## 추가한 모듈
* yarn add redux

## 리듀서 해석
```
function reducer(state = initialState, action ){
    switch (action.type){
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            }
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            }
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            }
        default:
            return state;
    }
}
```
* ...state 스테이트 값을 복제해서 그 state 값에 1을 더함
* 배열에 추가할 때에는 push 대신 concat 을 사용한다.

```
window.store = store
store.dispatch({type:'INCREASE'})
```
* console 창에서 dispatch 해볼 수 있다. 
