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
* yarn add react-redux
* yarn add redux-devtools-extension

## 추가한 확장프로그램
Redux DevTools

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
* index.js 에 provider 사용
store.dispatch({type:'INCREASE'})
```
* console 창에서 dispatch 해볼 수 있다. 

```
* components폴더/ presentational component 는 값을 props에서 받아와서 사용하는 component다.
* containers폴더/ 리덕스의 액션을 dispatch 하는 함수

관심사를 서로 분리 할 수 있고 presentation component의 재사용률이 높아진다.
```
 

* 상태를 조회할 때는 리덕스의 { useSelector }를 사용한다.

## err 해결과정
* Error: Objects are not valid as a React child
    * props를 잘 받아오지 못하는 문제 ({}) 으로 해결
* Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
    * 계속 렌더링 되는 문제  = () => {} 로 해결
* 동작되지 않음
    * type에 '' 따움표 붙이면 안됨
    
## Devtool 사용하기 
```
index.js
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(rootReducer, composeWithDevTools());
두번째 인자로 넣어줌
```

## useState, useCallback
* useState: 꼭 리덕스에서 관리해주지 않아도 된다. 그 파일 안에서 관리해서 사용할 수 있다.
* useCallback: 항상 새로 만들지 않고 재사용 해줄 수 있도록 최적화해준다.
```
const onCreate = useCallback(text => dispatch( addTodo(text) ), [dispatch]);
```

## react.memo 최적화 하기 ( 속도를 더 빠르 )
component를 react.memo로 감싸주기
사용하지 않는 component 렌더링 방지

## 최적화 하기
```
    const { number, diff } = useSelector(state => ({
        number: state.counter.number,
        diff: state.counter.diff
    }));
```
계속 새로운 객체를 만들기 때문에 사용하지 않을때에도 렌더링이 된다. 해결 방법 두가지
두가지 모두 성능은 거기서 거기다. 업데이트가 자주 되지않으면 굳이 최적화를 해주지 않아도 괜찮다. 
1. useSelector를 여러번 사용 ( 하나의 상태만 불러오도록 하는것 )
```
    const { number } = useSelector(state => state.counter.number);
    const { diff } = useSelector(state => state.counter.diff);
```

2. equalityFn: useSelector 이전 상태와 다음 상태를 비교할 수 있는 함수를 만듦
    2-1. ShallowEqual
```
    const { number, diff } = useSelector(state => ({
        number: state.counter.number,
        diff: state.counter.diff
    }),
    (left, right) => {
        return left.diff===right.diff && left.number===right.number
        }
    );

    const { number, diff } = useSelector(state => ({
            number: state.counter.number,
            diff: state.counter.diff
    }), shallowEqual);
```