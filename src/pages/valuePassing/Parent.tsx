import { useRef, useState } from "react";
import { Child } from "./Child";
export default function Parent() {
  /* ========= 1.2 props ============ */
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  /* ========= 5. Ref 父调用子 ============ */
  const childRef = useRef(null);
  const callChildMethod = () => {
    if (childRef.current) {
      childRef.current.childIncrementCount(); // 调用子组件的方法
    }
  };
  return (
    <div style={{ border: "1px solid #ccc" }}>
      <h2>Parent Component 父组件</h2>
      <div>{count}</div>
      {/* 4. Ref 父调用子 */}
      <button onClick={callChildMethod}>调用子组件方法 count+1</button>
      <br />
      {/* 1,2 父子，子父传值  */}
      <Child ref={childRef} count={count} handleIncrement={handleIncrement} />
    </div>
  );
}
