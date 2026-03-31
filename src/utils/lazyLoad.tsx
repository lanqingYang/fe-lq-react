import { lazy, Suspense } from "react";

// 封装懒加载 + Suspense，统一处理 loading
const lazyLoad = (
  factory: () => Promise<{ default: React.ComponentType<any> }>,
) => {
  const LazyComp = lazy(factory);

  return (
    <Suspense fallback={<div>页面加载中...</div>}>
      <LazyComp />
    </Suspense>
  );
};

export default lazyLoad;
