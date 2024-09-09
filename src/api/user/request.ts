import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";
import type {
  AdminUpdateUserReq,
  CustomUserInfoReq,
  RefreshTokenResult,
  UserListReq,
  UserListResp,
  UserUpdatePasswordReq
} from "./model";

/** 登录 */
export const getLogin = (data: object) => {
  return http.request("post", baseUrlApi("user/login"), { data });
};

/** 注册 */
export const userRegister = (data: object) => {
  return http.request("post", baseUrlApi("user/register"), { data });
};

/** 管理员修改用户信息 */
export const updateUserInfoByAdmin = (data: AdminUpdateUserReq) => {
  return http.request("post", baseUrlApi("user/updateUserInfoByAdmin"), {
    data
  });
};
/** 用户修改密码 */
export const updatePassword = (data: UserUpdatePasswordReq) => {
  return http.request("post", baseUrlApi("user/updatePassword"), {
    data
  });
};

/** 自定义用户信息 */
export const customUserInfo = (data: CustomUserInfoReq) => {
  return http.request("post", baseUrlApi("user/customUserInfo"), {
    data
  });
};

/** 分页获取用户列表 */
export const getUserList = (data: UserListReq) => {
  return http.request<UserListResp>("post", baseUrlApi("user/userList"), {
    data
  });
};

/** 管理员禁用用户 */
export const banUser = (data: number) => {
  return http.request("get", baseUrlApi("user/banUser?userId=" + data));
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};
