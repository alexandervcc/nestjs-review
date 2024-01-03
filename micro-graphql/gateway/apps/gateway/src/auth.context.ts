import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

type GraphqlContext = {
  req: Request;
};

export const authContext = ({ req }: GraphqlContext) => {
  if (req.headers?.authorization) {
    //validate jwt
    return {
      user: { id: '123' },
    };
  }
  throw new UnauthorizedException();
};
