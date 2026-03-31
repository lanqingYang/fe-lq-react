import { useState } from "react";

export default function UseStateReview() {
  const [count, setCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "张三",
    age: 18,
  });
  const [show, toggleShow] = useState(true);

  return (
    <div>
      <div>回顾useState</div>
      <div>计数: {count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <div>
        用户信息: {userInfo.name}, {userInfo.age}岁
      </div>
      <button
        onClick={() => setUserInfo({ ...userInfo, age: userInfo.age + 1 })}>
        更新年龄+1
      </button>
      <button onClick={() => toggleShow(!show)}>切换显示</button>
      {show && <p>这是要切换显示的内容</p>}
    </div>
  );
}
