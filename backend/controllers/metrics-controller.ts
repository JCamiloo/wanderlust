
import { HTTP_STATUS } from '../utils/constants.js';
import { Request, Response } from 'express';
import { registry } from '../config/metrics.js';

export const getAllMetrics = async (req: Request, res: Response) => {
  const result = await registry.metrics()
  return res.status(HTTP_STATUS.OK).send(result);
}