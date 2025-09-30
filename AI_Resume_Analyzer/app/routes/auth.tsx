import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
  { title: 'AI Resume Analyzer | Auth' },
  { name: 'description', content: 'Log into your account' },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1] || '/dashboard';
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="relative min-h-screen bg-[url('/images/bg-auth.svg')] bg-cover flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md p-1 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-2xl animate-fadeIn">
        <section className="bg-white rounded-2xl p-10 flex flex-col gap-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
            <h2 className="text-gray-600 mt-2">Log In to Continue Your Job Journey</h2>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all ${
                isLoading
                  ? 'bg-purple-500 animate-pulse cursor-not-allowed'
                  : auth.isAuthenticated
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-purple-600 hover:bg-purple-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              onClick={auth.isAuthenticated ? auth.signOut : auth.signIn}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading
                ? 'Signing you in...'
                : auth.isAuthenticated
                  ? 'Log Out'
                  : 'Log In'}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
