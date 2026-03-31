# 异步请求 asyncRequest 复习要点

React 异步请求 + 取消 + 并发 loading 稳定写法（复习要点）

## 核心设计思想

1. cancelRequest 只执行 abort()，不置 null，不创建实例
2. 每个请求内部独立 new AbortController()
3. signal 必须绑定当前请求的 controller.signal
4. finally 必须判断 ref.current === 当前控制器 才关闭 loading
5. fetch 需判断 !res.ok 手动抛出错误
6. 请求取消后，会走catch，需要单独处理AbortError
7. 连续点击靠实例判断保证状态正确
8. abortControllerRef 不需要手动置 null，垃圾回收自动处理
9. 不允许直接写 useEffect(async () => {}) 建议2种写法如下
   写法一:

```
useEffect(() => {
  const loadData = async () => {
    await fetchUser();
  };
  loadData();
}, []);
```

写法二：

```
useEffect(() => {
 (async () => {
    await fetchUser();
  })();
}, []);
```

不推荐用 useCallback 包裹请求函数
依赖必须写全，依赖多容易漏、难排查；
直接在 useEffect 内部定义异步函数更简洁、更安全。
