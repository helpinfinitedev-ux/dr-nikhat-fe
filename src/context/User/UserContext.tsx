import { User as UserType } from "@/lib/db";
import { UserService } from "@/services/User/index.service";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await UserService.getUser();
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.error("Error fetching user:", response.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>;
};

export default UserContext;
