import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success! Role:", data.role);
        if (data.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (data.role === "user") {
          window.location.href = "/";
        }
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EAD3]">
      <h1 className="text-2xl font-semibold mb-6">Yuk masuk lalu pesan !</h1>
      <div className="bg-white p-10 rounded-md shadow-md w-[520px]">
        <h1 className="text-2xl text-center font-semibold mb-6">Masuk</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="text-white bg-gray-900 px-4 py-2 w-full rounded-md hover:bg-gray-600 duration-300"
          >
            Masuk
          </button>

          <p className="text-center mt-6">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-semibold hover:text-blue-700 duration-300"
            >
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
