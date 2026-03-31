// 1. 定义类型
interface User {
  id: number;
  login: string;
  avatar_url: string;
}

export default function AsyncRequest() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. 定义一个 AbortController 实例，取消请求
  const abortControllerRef = useRef<AbortController | null>(null);

  // 取消请求
  function cancelRequest() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  // 获取用户数据
  async function fetchUser() {
    setLoading(true);
    // 取消上一次的请求，重新创建一个新的实例
    cancelRequest();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    fetch("https://api.github.com/users", {
      //!不加signal 无法取消请求，组件卸载后请求完成才会去更新状态，导致内存泄漏和报错
      signal: abortController.signal,
    })
      .then(async (res: any) => {
        if (!res.ok) {
          throw new Error(`请求失败，状态码：${res.status}`);
        } else {
          const data: User[] = await res.json();
          setUser(data[0]);
          setError(null);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setError("请求被取消");
          return;
        }
        setError(err.message);
      })
      .finally(() => {
        // 当前的 abortController 实例是最新的，才去更新 loading 状态。避免取消别的请求，但是当前仍有请求在执行时，loading 状态被错误地更新。
        if (abortControllerRef.current === abortController) {
          setLoading(false);
        }
      });
  }

  /* 一、 useEffect 不允许使用 useEffect(async()=>{})，因为 async 函数会返回一个 Promise 对象，而 useEffect 期望返回一个函数（用于清理副作用）或者不返回任何东西。所以调用异步时，需要内部创建一个异步函数再调用  */
  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
    };
    loadData();

    //   写法二：
    /*  (async () => {
      await fetchData();
    })(); */
    return () => {
      cancelRequest();
    };
    /*  二、关于依赖：
    1. [] 只执行一次。
    2.不写[] 每次更新状态都会执行，基本不使用
    3.[count]指定依赖更新时执行
    */
  }, []);

  return (
    <div>
      <h2>useEffect 异步请求</h2>
      <div>{loading ? "loading请求中" : "请求完成"}</div>
      <br />
      <div>用户名:{user?.id}</div>
      <br />
      <div>{error ? `请求出错：${error}` : "请求成功"}</div>
      <br />

      <button onClick={fetchUser}>
        重新请求（可一直点击用慢网速测试，测试取消请求）
      </button>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
