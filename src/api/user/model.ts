import type { BasePageResponse, BaseResponse } from "../model";

/**
 * 用户登入model
 */
export type UserLoginReq = {
  account: string;
  password: string;
};

export type UserResult = {
  code: number;
  data: UserInfo;
  message: string;
};

export type UserInfo = {
  /**id */
  id?: string;
  /**性别 */
  gender?: number;
  /** 头像 */
  userAvatar?: string;
  /** 账号 */
  account?: string;
  /** 昵称 */
  name?: string;
  /** 用户简介*/
  userProfile?: string;
  /** 当前登录用户的角色 0普通用户，1管理员 */
  userRole?: number;
};

/**
 * 用户注册model
 */
export type UserRegister = {
  account: string;
  password: string;
  repeatPassword: string;
};

/**
 * @description 管理员更新用户信息
 */
export type AdminUpdateUserReq = {
  id: string;
  gender?: number;
  mpOpenId?: string;
  name?: string;
  password?: string;
  unionId?: string;
  userAvatar?: string;
  userProfile?: string;
  userRole?: number;
};

/**
 * @description 用户更新密码
 */
export type UserUpdatePasswordReq = {
  newPassword: string;
  newRepeatedPassword: string;
  oldPassword: string;
};

/**
 * 用户自定义用户信息
 */
export type CustomUserInfoReq = {
  gender?: number;
  name?: string;
  userAvatar?: string;
  userProfile?: string;
};

export type CustomUserInfoResp = BaseResponse<{
  id: string;
  account: string;
  gender: number;
  name: string;
  userAvatar: string;
  userProfile: string;
  userRole: number;
}>;

/**
 * 分页获取用户信息列表
 */
export type UserListReq = {
  current: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: string;
  name?: string;
  id?: string;
  account?: string;
  gender?: number;
  userRole?: number;
  unionId?: string;
  updateTime?: Date;
};

export type UserListResp = BaseResponse<BasePageResponse<Array<UserInfo>>>;

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

export enum UserRole {
  "user",
  "admin",
  "ban"
}

export enum Gender {
  "男",
  "女",
  "其他"
}
