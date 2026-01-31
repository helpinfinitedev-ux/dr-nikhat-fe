import http from "./http.service";
import Promisable from "./promisable.service";

export const UserService = {
  login: async (mobile: string, password: string) => {
    return await Promisable.asPromise(
      http.post("/api/users/login", {
        mobile,
        password,
      })
    );
  },
  register: async (name: string, mobile: string, password: string) => {
    return await Promisable.asPromise(
      http.post("/api/users/register", {
        name,
        mobile,
        password,
      })
    );
  },
};
