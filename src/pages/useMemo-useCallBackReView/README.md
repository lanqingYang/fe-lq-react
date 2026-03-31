# useMemo，useCallBack 回顾

这两个 Hook 都是为了 “缓存”，避免没必要的重复计算、重复创建，从而减少组件不必要渲染。

## 一、最关键区别（必背）

1. useCallback(fn, deps)→ 缓存函数本身→ 等价于：useMemo(() => fn, deps)
2. useMemo(() => fn(), deps)→ 缓存函数执行结果

## 二、使用场景

### useCallback

1. 函数会作为 props 传给子组件，同时子组件也需要用 memo 包裹
   因为React 默认：父组件渲染 → 所有子组件无条件全部重新渲染！ 子组件使用memo包裹才能只做浅比较跳过渲染 (注意这里不是useMemo！！ memo是高阶组件（HOC）)

没 useCallback → props 每次都变 → 子组件必渲染 。所以用useCallback包裹函数
没 memo → 子组件根本不对比 props → 父渲染它就渲染，所以没useMemo，useCallback包裹函数也没用

### useMemo

1. 有明显耗时的计算：大数据量 filter /sort/reduce。普通简单计算（如加减乘除）完全不需要.
   比如有个count状态更新，视图更新但不是useMemo的依赖，那么计算结果就不会更新
