import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/auth";

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handAuthCallback() {
      await auth.handleAuthentication();
      navigate(localStorage.getItem("zucchini-redirectUrl") || "/");
    }

    handAuthCallback();
  }, []);

  return <>Loading...</>;
}
