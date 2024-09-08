import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";
import type { RefreshTokenResult, UserInfo } from "@/api/user/model";
import { getLogin, refreshTokenApi } from "@/api/user/request";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    /**id */
    id: storageLocal().getItem<DataInfo<number>>(userKey)?.id ?? 0,
    // 头像
    userAvatar:
      storageLocal().getItem<DataInfo<number>>(userKey)?.userAvatar === "" ||
      storageLocal().getItem<DataInfo<number>>(userKey)?.userAvatar === null
        ? "/src/assets/user.jpg"
        : storageLocal().getItem<DataInfo<number>>(userKey)?.userAvatar,
    // 用户名
    account: storageLocal().getItem<DataInfo<number>>(userKey)?.account ?? "",
    // 昵称
    name: storageLocal().getItem<DataInfo<number>>(userKey)?.name ?? "",
    // 用户简介
    userProfile:
      storageLocal().getItem<DataInfo<number>>(userKey)?.userProfile ?? "",
    // 用户权限，后端返回
    userRole: storageLocal().getItem<DataInfo<number>>(userKey)?.userRole ?? 0,
    // 用户性别
    gender: storageLocal().getItem<DataInfo<number>>(userKey)?.gender ?? 0,
    // 页面级别权限，前端设置
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 按钮级别权限
    permissions:
      storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [],
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),

  actions: {
    /**跟新用户基本信息 */
    UPDATE_USER_INFO(userInfo: UserInfo) {
      this.id = userInfo.id;
      this.userAvatar =
        userInfo?.userAvatar === "" || userInfo?.userAvatar === null
          ? "/src/assets/user.jpg"
          : userInfo?.userAvatar;
      this.gender = userInfo?.gender;
      this.account = userInfo?.account;
      this.name = userInfo?.name;
      this.userProfile = userInfo.userProfile;
      this.userRole = userInfo.userRole;
    },

    /**存储用户id */
    SET_ID(id: number) {
      this.id = id;
    },
    /** 存储头像 */
    SET_USER_AVATAR(userAvatar: string) {
      if (userAvatar === undefined || userAvatar === null) {
        this.userAvatar = "/src/assets/user.jpg";
        return;
      }
      this.userAvatar = userAvatar;
    },
    /** 存储用户名 */
    SET_ACCOUNT(account: string) {
      this.account = account;
    },
    /** 存储昵称 */
    SET_NAME(name: string) {
      this.name = name;
    },
    /**存储用户简介 */
    SET_USER_Profile(userProfile: string) {
      this.userProfile = userProfile;
    },
    /** 存储角色权限 */
    SET_USER_ROLE(userRole: number) {
      this.userRole = userRole;
    },
    SET_GENDER(gender: number) {
      this.gender = gender;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(data) {
      return getLogin(data);
      // return new Promise<UserResult>((resolve, reject) => {
      //   getLogin(data)
      //     .then(data => {
      //       if (data?.code === 0) setToken(data);
      //       resolve(data);
      //     })
      //     .catch(error => {
      //       reject(error);
      //     });
      // });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.account = "";
      this.roles = [];
      this.permissions = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
