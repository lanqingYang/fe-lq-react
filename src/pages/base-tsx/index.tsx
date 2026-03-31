// tsx语法 &基础组件

import Child from "./Child";

export default function BaseTsx() {
  // 基本变量
  const title = "tsx 语法 &基础组件";
  const show: boolean = true;

  return (
    <div>
      <h2>{title}</h2>

      {/* 1.表达式插值 */}
      <p>表达式插值：{title}</p>

      {/* 2.条件渲染 */}
      {show ? <p>条件渲染：显示</p> : <p>条件渲染：隐藏</p>}

      {/* 3.列表渲染 */}
      <ul>
        {["1列表", "2列表", "3列表"].map((item) => (
          <li key={item}>列表渲染：{item}</li>
        ))}
      </ul>
      {/* 4.子组件 */}
      <Child name='React' />
    </div>
  );
}
