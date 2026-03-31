import { useEffect, useRef, useState } from "react";

export default function UseRefReview() {
  /* ================== 1.获取DOM  ============== */
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
  }
  useEffect(() => {
    focusInput();
  }, []);
  /* ================== 2.数据更新不会触发重新渲染  ============== */
  const [count, setCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    timerRef.current = window.setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // 卸载清理
  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  /* ================== 3.保存上一次的值  ============== */
  const [num, setNum] = useState(0);
  const prevCount = usePrevious(num);

  return (
    <div>
      {/* 1. 获取 DOM 元素（最常用）*/}
      <input ref={inputRef} type='text' placeholder='挂载自动聚焦输入框' />
      {/* 2. 数据更新不会触发重新渲染 */}
      <div>
        计时器
        <div>计数：{count}</div>
        <button onClick={start}>开始</button>
        <button onClick={stop}>停止</button>
      </div>

      {/* 例子： 保存上一次的值 */}
      <div style={{ padding: 20 }}>
        <h2>当前 num：{num}</h2>
        <h3>上一次 num：{prevCount}</h3>
        <button onClick={() => setNum(num + 1)}>+1</button>
      </div>
    </div>
  );
}

// 通用自定义 Hook：保存上一次的值
function usePrevious<T>(value: T) {
  const prevRef = useRef<T>(null);
  useEffect(() => {
    // 每次 value 更新后，把当前值存到 ref
    prevRef.current = value;
  }, [value]);

  // 先执行返回，再执行 useEffect 内部更新 ref 的值，所以返回的就是上一次的值。由于ref的更新不回影响视图，所以执行完 useEffect 后组件不会重新渲染，所以返回的 prevRef.current 仍然是上一次的值，实际 .current 的值已经是最新的了。
  return prevRef.current;
}
