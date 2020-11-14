import React from "react";
import Counter from "../components/Counter";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer (){
    // 최적화
    // 1
    // const { number, diff } = useSelector(state => ({
    //     number: state.counter.number,
    //     diff: state.counter.diff
    // }));

    // 2
    // const { number } = useSelector(state => state.counter.number);
    // const { diff } = useSelector(state => state.counter.diff);

    // 3
    // const { number, diff } = useSelector(state => ({
    //     number: state.counter.number,
    //     diff: state.counter.diff
    // }),
    // (left, right) => {
    //     return left.diff===right.diff && left.number===right.number
    //     }
    // );

    // 4 shallowEqual
    const { number, diff } = useSelector(state => ({
            number: state.counter.number,
            diff: state.counter.diff
    }), shallowEqual);

    const dispatch = useDispatch();
    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onSetDiff = diff => dispatch(setDiff(diff));

    return(
        <Counter
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    )
}

export default CounterContainer;