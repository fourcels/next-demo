import { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    console.log(value);
    ref.current = value;
  });
  console.log('out', ref.current);
  return ref.current;
}

// 使用
export function Counter() {
  console.log('render');
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  function onClick() {
    setCount(count + 1)
  }
  return (<div>
    <h1>Now: {count}, before: {prevCount}</h1>
    <button onClick={onClick}>click</button>
  </div>)
}