import { User as UserType } from "@/lib/db";
import { UserService } from "@/services/user.service";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
  triggerUserFetch: boolean;
  setTriggerUserFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [triggerUserFetch, setTriggerUserFetch] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const [response, error] = await UserService.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(response.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, [triggerUserFetch]);

  return <UserContext.Provider value={{ user, setUser, loading, triggerUserFetch, setTriggerUserFetch }}>{children}</UserContext.Provider>;
};

export default UserContext;
