import { createParamDecorator } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: GraphQLExecutionContext) => {
    try {
      const headers = ctx['args'][2].req.headers;
      if (headers?.user) {
        return JSON.parse(headers.user);
      }
    } catch (error) {
      return null;
    }
  },
);
