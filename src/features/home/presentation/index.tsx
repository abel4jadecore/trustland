import useAuth from "@/features/core/presentation/hooks/useAuth";

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      Authenticated
      <button
        onClick={() => {
          logout();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default HomePage;
