import { RouterProvider } from "@tanstack/react-router";
import { useRouter } from "./router";

const App = () => {
  const router = useRouter();
  return <RouterProvider router={router} />;
};

export default App;
