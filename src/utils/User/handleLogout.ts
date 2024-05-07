import router from "next/router";
import deleteSession from "./deleteSession";

export default () => {
  deleteSession();
  localStorage.removeItem("user");
  if (user) {
    setTimeout(() => {
      setUser(null);
      router.push("/");
    }, 1000);
  }
};
