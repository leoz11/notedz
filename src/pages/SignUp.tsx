import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface SignUpProps {
  darkMode: boolean;
}

const SignUp = ({ darkMode }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage("Conta criada! Verifique seu email para confirmar.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 3000);
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
        <h2 className="text-2xl text-center mb-8">Cadastro</h2>

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

          {message && (
            <div
              className={`p-4 rounded-lg border-2 ${
                darkMode
                  ? "bg-green-900/20 border-green-500 text-green-200"
                  : "bg-green-50 border-green-300 text-green-800"
              }`}
            >
              {message}
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

          <div>
            <label className="block mb-2 text-lg">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <div className="mt-8 text-center text-base">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
