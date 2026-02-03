import http from "./http.service";
import Promisable from "./promisable.service";

export const UserService = {
  login: async (mobile: string, password: string) => {
    const [res, error] = await Promisable.asPromise(
      http.post("/api/users/login", {
        mobile,
        password,
      })
    );
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.location.href = "/";
    return [res, error];
  },
  register: async (data: any) => {
    const [res, error] = await Promisable.asPromise(
      http.post("/api/users/register", {
        name: data.name,
        mobile: data.mobile,
        password: data.password,
        emailAddress: data.email,
      })
    );
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return [res, error];
  },
  getUser: async () => {
    http.setJWT();
    return await Promisable.asPromise(http.get("/api/users/me"));
  },
};
