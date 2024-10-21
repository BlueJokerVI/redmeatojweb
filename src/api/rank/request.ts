import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/**每日用户ac排名 */
export const userRank = (count: number) => {
  return http.request("get", baseUrlApi("/rank/?count=" + count));
};
