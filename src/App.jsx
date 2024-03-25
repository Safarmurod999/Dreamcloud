import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout, Home, Login } from "./pages/index";
import { adminRoutes } from "./data/data";
import ProtectedRoute from "./pages/Layout/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const route = useLocation();
  return (
    <>
      {route.pathname == "/" ? (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          </Routes>
        </>
      ) : route.pathname.startsWith("/admin") ? (
        <Routes>
          <Route element={<ProtectedRoute />}>
            {adminRoutes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<Layout>{route.element}</Layout>}
              />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : route.pathname.startsWith("/login") ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
