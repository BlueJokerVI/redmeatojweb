import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
export type UserResult = {
  code: number;
  data: {
    /**id */
    id: number;
    /**性别 */
    gender: number;
    /** 头像 */
    userAvatar: string;
    /** 账号 */
    account: string;
    /** 昵称 */
    name: string;
    /** 用户简介*/
    userProfile: string;
    /** 当前登录用户的角色 0普通用户，1管理员 */
    userRole: number;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/login"), { data });
};

/** 注册 */
export const userRegister = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/register"), { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};
