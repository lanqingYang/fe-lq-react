import { useEffect, useState } from "react";

export default function UseEffectReview() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("组件挂载了 componentDidMount");
    return () => {
      // 由于严格模式下，会挂载->卸载->再挂载，所以首次进入页面就会打印一次卸载
      console.log("组件卸载了 componentWillUnmount");
    };
  }, []);

  useEffect(() => {
    console.log("count的值发生变化时打印：count值变化了 componentDidUpdate");
  }, [count]);

  return (
    <div>
      <div>回顾useEffect,控制台查看挂在和卸载信息</div>
      <p>1. 组件一进来打印：组件挂载了 componentDidMount</p>
      <br />
      <p>2. count的值发生变化时打印：count值变化了 componentDidUpdate</p>
      <br />
      <p>3. 组件卸载时打印：组件卸载了 componentWillUnmount</p>
      <br />
      <div>计数: {count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
