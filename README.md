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