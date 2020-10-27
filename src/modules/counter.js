/* Action Type 선언하기 */
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* Action 생성함수 작성 */
export const setDiff = diff => ({ type: 'SET_DIFF', diff });
export const increase = () => ({ type: 'INCREASE' });
export const decrease = () => ({ type: 'DECREASE' });

/* 모듈의 초기상태 작성 */
const initialState = {
    number: 0,
    diff: 1
}

/* 리듀서를 작성 */
export default function counter(state=initialState, action){
    switch (action.type) {
        case SET_DIFF:
            return {
                /* action에서 diff 값을 받아와서 대체시켜 줄 것 */
                ...state,
                diff: action.diff
            }
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff
            }
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff
            }
        default:
            return state;
    }
}