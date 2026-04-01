import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { RoutePath } from "./constants/RoutePath";
import { Link, useRoutes } from "react-router-dom";
import { routes } from "./router";
import AppProvider from "./contexts/AppProvider";

function App() {
  const elements = useRoutes(routes);
  return (
    <AppProvider>
      <section id='center'>
        <div className='hero'>
          <img src={heroImg} className='base' width='170' height='179' alt='' />
          <img src={reactLogo} className='framework' alt='React logo' />
          <img src={viteLogo} className='vite' alt='Vite logo' />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
      </section>

      {/* 路由跳转至各个板块 */}
      {/* 导航菜单 */}
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #eee",
        }}>
        <Link to={RoutePath.BASE_TSX}>首页</Link>
        <Link to={RoutePath.USE_STATE_REVIEW}>useState回顾</Link>
        <Link to={RoutePath.USE_EFFECT_REVIEW}>useEffect回顾</Link>
        <Link to={RoutePath.ASYNC_REQUEST_REVIEW}>useEffect & 异步请求</Link>
        <Link to={RoutePath.USE_REF_REVIEW}>useRef回顾</Link>
        <Link to={RoutePath.USE_MEMO_USE_CALLBACK_REVIEW}>
          useMemo & useCallback回顾
        </Link>
        <Link to={RoutePath.VALUE_PASSING_REVIEW}>传值方式回顾</Link>
        <Link to={RoutePath.CONTROLLED_COMPONENTS}>受控组件</Link>
      </nav>

      {/* 路由内容渲染 */}
      {/* 1. 循环渲染 */}
      {/* <Routes>
        {routes.map((route) => (
          <Route key={route.path} element={route.element}></Route>
        ))}
      </Routes> */}
      {/* 2. useRoutes 企业级写法 */}
      <div className='element-render'>{elements}</div>
    </AppProvider>
  );
}

export default App;
