import type { BasePageReq, BasePageResponse, BaseResponse } from "../model";

/**
 * 添加提交记录请求
 */
export type AddSubmitRecordReq = {
  language: string;
  questionId: string;
  submitContext: string;
};

export type SubmitRecordVo = {
  createTime: "";
  id: string;
  judgeResult: 0;
  language: "";
  memoryConsume: 0;
  questionId: string;
  submitContext: string;
  timeConsume: 0;
  userId: string;
};
/**
 * 添加提交记录resp
 */
export type AddSubmitRecordResp = BaseResponse<SubmitRecordVo>;

/**分页获取提交记录请求 */
export type SearchSubmitRecordsReq = BasePageReq & {
  createTime?: string;
  id?: string;
  judgeResult?: string;
  questionId?: string;
  userId?: string;
};

/**分页获取提交记录resp */
export type SearchSubmitRecordsResp = BaseResponse<
  BasePageResponse<SubmitRecordVo>
>;
