import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUserToDB(user);
    next();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Created Successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
