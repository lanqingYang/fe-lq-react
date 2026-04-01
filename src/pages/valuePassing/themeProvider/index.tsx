import { useTheme } from "../../../contexts/index";

function ThemeSwitcher() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        background: isDark ? "#111" : "#fff",
        color: isDark ? "#fff" : "#111",
      }}>
      <h3>4. Provide-当前主题：{theme}</h3>
      <button onClick={toggleTheme}>切换暗黑/亮色</button>
    </div>
  );
}

export default ThemeSwitcher;
