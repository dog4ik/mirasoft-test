import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchUserStart } from "../slices/userSlice";

export default function useUserQuery(userId: number) {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserStart(userId));
  }, []);

  return user;
}
