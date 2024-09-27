import type { BasePageReq, BasePageResponse, BaseResponse } from "../model";

/**
 * 添加题目请求
 */
export type AddQuestionReq = {
  questionDesc: string;
  questionIoExample: Array<TestCase>;
  questionIoTotal: number;
  questionMemLimit: number;
  questionName: string;
  questionTags: Array<String>;
  questionTimeLimit: number;
};

export type TestCase = {
  inputContent: string;
  outputContent: string;
  testCaseId: string;
};

export type QuestionVo = {
  id: string;
  createTime: String;
  questionAcNum: number;
  questionIoTotal: number;
  questionDesc: string;
  questionIoExample: Array<TestCase>;
  questionMemLimit: number;
  questionName: string;
  questionSubmitNum: number;
  questionTags: Array<string>;
  questionTimeLimit: number;
  updateTime: String;
};

/**
 * 添加题目响应
 */
export type AddQuestionResp = BaseResponse<QuestionVo>;

/**
 * 题目更新
 */
export type UpdateQuestionReq = {
  id: string;
  questionAcNum?: number;
  questionDesc?: string;
  questionIoExample?: Array<TestCase>;
  questionMemLimit?: number;
  questionName?: string;
  questionSubmitNum?: number;
  questionTags?: Array<string>;
  questionTimeLimit?: number;
  testCases?: Array<TestCase>;
};

/**
 * 题目跟新响应
 */
export type UpdateQuestionResp = BaseResponse<QuestionVo>;

/**
 * 题目分页查询
 */
export type SearchQuestionListReq = BasePageReq & {
  id?: string;
  questionName?: string;
  questionTags?: Array<string>;
};

/**题目分页查询响应 */
export type SearchQuestionListResp = BaseResponse<BasePageResponse<QuestionVo>>;

/**删除指定测试用例请求 */
export type DeleteTestCaseReq = {
  questionId: string;
  testCaseId: number;
};

/**题目测试用例分页搜索请求 */
export type GetTestCasePageReq = BasePageReq & {
  questionId: string;
};

/** 题目测试用例分页搜索响应 */
export type GetTestCasePageResp = BaseResponse<BasePageResponse<TestCase>>;

/**添加题目测试用例请求 */
export type AddTestCasesReq = {
  questionId: string;
  testCases: Array<TestCase>;
};
