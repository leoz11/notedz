import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LoginProps {
  darkMode: boolean;
}

const Login = ({ darkMode }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 font-fira ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center mb-4">notedz</h1>
        <h2 className="text-2xl text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className={`p-4 rounded-lg border-2 ${
                darkMode
                  ? "bg-red-900/20 border-red-500 text-red-200"
                  : "bg-red-50 border-red-300 text-red-800"
              }`}
            >
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg border-2 font-fira text-base ${
                darkMode
                  ? "bg-black border-white text-white placeholder-gray-500"
                  : "bg-white border-black text-black placeholder-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode ? "focus:ring-white" : "focus:ring-black"
              }`}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg border-2 font-fira text-base ${
                darkMode
                  ? "bg-black border-white text-white placeholder-gray-500"
                  : "bg-white border-black text-black placeholder-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode ? "focus:ring-white" : "focus:ring-black"
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full border-2 font-semibold text-lg transition-all duration-300 ${
              darkMode
                ? "border-white hover:bg-white hover:text-black"
                : "border-black hover:bg-black hover:text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <Link
            to="/forgot-password"
            className="block hover:underline text-base"
          >
            Esqueceu a senha?
          </Link>
          <div className="text-base">
            Não tem conta?{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
