import Parent from "./Parent";
import ThemeCmp from "./themeProvider/index";
import eventBus from "../../utils/eventBus";
import { VALUE_TRANSFER_INCREMENT_COUNT } from "../../constants/EventBusKey";
export default function ValuePassing() {
  return (
    <div>
      Value Passing 传值
      <Parent></Parent>
      <br />
      {/* theme provider */}
      <div>
        <ThemeCmp></ThemeCmp>
      </div>
      {/* 6.mitt  */}
      <p>mitt 触发子组件+1方法</p>
      <button onClick={() => eventBus.emit(VALUE_TRANSFER_INCREMENT_COUNT)}>
        触发子组件+1方法
      </button>
    </div>
  );
}
