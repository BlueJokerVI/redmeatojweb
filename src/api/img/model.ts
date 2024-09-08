import type { BaseResponse } from "../model";

/**
 * @description 获取上传图片请求路径模型
 * 要求以路径以  test/img/xxx 的形式不要以/开头
 */
export type GetImgUrlReq = {
  autoPath?: true;
  fileName: string;
  filePath: string;
};

export type ImgUploadUrlResponse = BaseResponse<{
  uploadUrl: string;
  downloadUrl: string;
}>;

export type UploadFileReq = {
  uploadUrl: string;
  data: Blob;
  contextType: string;
};

export enum ImgStoreLocation {
  userAvatar = "userAvatar"
}
