import express from 'express';

// 生成 router 的工厂工具函数
export const createRouterFactoryFun = (options) => {
  return express.Router(options)
}