import { useState, useMemo, useCallback, memo } from "react";

export default function useMemoAndUseCallBackReview() {
  /* ================= 1.useMemo ================= */
  const [list] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [keyword, setKeyword] = useState("");

  // 缓存过滤结果，只有 list 或 keyword 变了才重新算
  const filteredList = useMemo(() => {
    console.log(
      "重新计算过滤,其他情况下视图更新不计算，比如有个count状态更新，视图更新但不计算过滤",
    );
    return list.filter((item) => item % 2 === 0); // 只留偶数
  }, [list, keyword]);

  return (
    <div>
      useMemo 和 useCallback 回顾
      {/* useMemo 过滤*/}
      <div>
        <input onChange={(e) => setKeyword(e.target.value)} />
        {filteredList.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      {/* useCallback */}
      <br />
      <p>useCallBack. 点击onclick触发视图刷新，但子组件不会重新渲染</p>
      <Parent></Parent>
    </div>
  );
}

/* ================= 2.useCallback 主要看代码写法 readme里面有详细说明================= */

// 用 memo 包裹
const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child 渲染了"); // 不会频繁出现
  return <button onClick={onClick}>点击,控制台Child不会触发重新渲染</button>;
});

// 父组件
const Parent = () => {
  const [count, setCount] = useState(0);

  /* 
    2.1父渲染 → 新建 handleClick
    2.2传给 Child 的 props 变成 新引用
    2.3 Child 发现 props 变了 → 被迫跟着重新渲染
    即使 Child 根本没变，只是函数引用变了，它也会重渲染。
 */
  /* 普通写法导致Child 每次都渲染
  // 👇 每次渲染都会创建一个新的函数！
   const handleClick = () => {
    setCount(count + 1);
  }; */

  // 最佳写法：用 useCallback 缓存函数，只有依赖变了才新建函数
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1); // 用函数式更新，不依赖外部 count。
  }, []);

  return <Child onClick={handleClick} />;
};
