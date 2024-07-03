import { useRouter } from "next/navigation";
import { createApiInstance } from "@/api/axiosInstance";

export const useCreateAxiosInstance = () => {
  const router = useRouter();
  return createApiInstance(router.replace);
};
