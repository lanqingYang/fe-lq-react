import type { RouteObject } from "react-router-dom";
import { RoutePath } from "../constants/RoutePath";
import lazyLoad from "../utils/lazyLoad";

export const routes: RouteObject[] = [
    {
        path: RoutePath.BASE_TSX,
        // 异步懒加载 只有当用户跳转到这个页面时，才去下载这个页面的 JS。下方写法就是lazy() 函数内部接收的参数格式。
        // element: import("../pages/base-tsx/index.tsx").then((module) => module.default),
        /* 企业级写法（搭配 React 自带的 lazy + Suspense） */
        element: lazyLoad(() => import("../pages/base-tsx/index.tsx")),

    },
    /* useState回顾 */
    {
        path: RoutePath.USE_STATE_REVIEW,
        element: lazyLoad(() => import("../pages/useStateReview/index.tsx")),
    }
]