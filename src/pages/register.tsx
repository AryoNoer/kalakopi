import { useState } from "react";
import { useRouter } from "next/navigation";
const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert("Registrasi Berhasil Sukses");
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EAD3]">
      <h1 className="text-2xl font-semibold mb-6">Yuk daftar dulu !</h1>
      <div className="bg-white p-10 rounded-md shadow-md w-[520px]">
        <h1 className="text-2xl text-center font-semibold mb-6">Daftar</h1>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Username:
          </label>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Password:
          </label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleRegister}
          className="text-white bg-gray-900 px-4 py-2 w-full rounded-md hover:bg-gray-600 duration-300"
        >
          Daftar
        </button>
      </div>
    </div>
  );
};

export default Register;
