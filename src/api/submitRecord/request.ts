import { http } from "@/utils/http";
import type {
  AddSubmitRecordResp,
  AddSubmitRecordReq,
  SearchSubmitRecordsReq,
  SearchSubmitRecordsResp
} from "./model";
import { baseUrlApi } from "../utils";

/** 添加提交记录请求  */
export const addSubmitRecord = (data: AddSubmitRecordReq) => {
  return http.request<AddSubmitRecordResp>(
    "post",
    baseUrlApi("submitRecord/add"),
    {
      data
    }
  );
};

/**提交记录查询 */
export const searchSubmitRecords = (data: SearchSubmitRecordsReq) => {
  return http.request<SearchSubmitRecordsResp>(
    "post",
    baseUrlApi("submitRecord/searchPage"),
    {
      data
    }
  );
};
