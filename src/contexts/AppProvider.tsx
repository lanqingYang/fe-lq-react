import { ThemeProvider } from "./ThemeContext";

// 管理所有Provider，方便在App.tsx中统一引入
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
