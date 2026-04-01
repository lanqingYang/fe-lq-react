import { useState } from "react";

type LoginUserType = "user" | "admin";
export default function LoginForm() {
  // 1. 表单状态
  const [form, setForm] = useState({
    username: "",
    password: "",
    login_user_type: "user" as LoginUserType,
  });

  // 加载状态
  const [loading, setLoading] = useState(false);

  // 2. 统一处理输入变化
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 3. 提交
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认刷新

    // 简单校验
    if (!form.username || !form.password) {
      alert("请输入账号密码");
      return;
    }

    try {
      setLoading(true);
      // 调用登录接口
      console.log("提交登录：", form);
      // await loginApi(form)
      alert("登录成功");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 300, margin: "20px auto" }}>
      <div>
        <label>账号：</label>
        <input
          type='text'
          name='username'
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>密码：</label>
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        {/*<label>用户类型：</label>
        <select
          name='login_user_type'
          value={form.login_user_type}
          onChange={handleChange}>
          <option value='user'>用户</option>
          <option value='admin'>管理员</option>
        </select> */}
        <input
          type='radio'
          name='login_user_type'
          value='user'
          checked={form.login_user_type === "user"}
          onChange={handleChange}
        />
        <label>用户</label>
        <input
          type='radio'
          name='login_user_type'
          value='admin'
          checked={form.login_user_type === "admin"}
          onChange={handleChange}
        />
        <label>管理员</label>
      </div>

      <button
        type='submit'
        disabled={loading}
        style={{ marginTop: 20, width: "100%" }}>
        {loading ? "提交中..." : "登录"}
      </button>
    </form>
  );
}
