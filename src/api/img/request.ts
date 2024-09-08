import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";
import type { GetImgUrlReq, UploadFileReq } from "./model";
import { uploadFileAxios } from "./utils";

/** 获取上传图片请求路径 */
export const getUpLoadImgUrl = (data: GetImgUrlReq) => {
  return http.request<any>("post", baseUrlApi("user/getOssUrl"), { data });
};
export const fileUpload = (uploadImgReq: UploadFileReq) => {
  return uploadFileAxios(uploadImgReq.uploadUrl, {
    method: "put",
    data: uploadImgReq.data,
    headers: {
      "Content-Type": uploadImgReq.contextType
    }
  });
};
