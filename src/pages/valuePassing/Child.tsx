import { forwardRef, useEffect, useImperativeHandle } from "react";
import eventBus from "../../utils/eventBus";
import { VALUE_TRANSFER_INCREMENT_COUNT } from "../../constants/EventBusKey";

type Props = {
  count: number;
  handleIncrement: () => void;
};

export const Child = forwardRef(function ChildFn(
  { count, handleIncrement }: Props,
  ref,
) {
  /*  ====== 抛出一个方法给父组件调用 =======*/
  const childIncrementCount = () => {
    console.log("Child 调用了父组件的方法 count +1");
    handleIncrement();
  };

  useImperativeHandle(ref, () => ({
    childIncrementCount,
  }));
  /*  ====== 监听mitt =======*/
  useEffect(() => {
    eventBus.on(VALUE_TRANSFER_INCREMENT_COUNT, childIncrementCount);
    return () => {
      eventBus.off(VALUE_TRANSFER_INCREMENT_COUNT, childIncrementCount);
    };
  }, []);

  return (
    <div style={{ border: `1px solid orange` }}>
      <h2>Child Component 子组件</h2>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
});
