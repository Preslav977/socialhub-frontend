import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectApp({ children, path }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (path === "/") {
      navigate("/login");
    }
  }, [path]);

  return children;
}
