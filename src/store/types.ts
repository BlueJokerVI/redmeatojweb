import type { UserInfo } from "@/api/user/model";
import type { RouteRecordName } from "vue-router";

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Collapse
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
  viewportSize: { width: number; height: number };
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type userType = UserInfo & {
  //页面级别权限
  roles?: Array<string>;
  /** 按钮级别权限 */
  permissions?: Array<string>;
  /** `token` */
  accessToken?: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken?: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires?: Date;
  //是否勾选了登录页的免登录
  isRemembered?: boolean;
  // 登录页的免登录存储几天
  loginDay: number;
};
