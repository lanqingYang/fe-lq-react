interface ChildProps {
  name: string;
}

// 企业级写法，参数少最好直接在函数参数上解构，参数多了可以在函数体内解构
export default function Child({ name }: ChildProps) {
  return <div>Child Component, name: {name}</div>;
}
