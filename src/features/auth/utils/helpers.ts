import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type CustomErrorType = {
  status: number;
  data: {
    message: 'string';
  };
};

export function isCustomErrorType(error: unknown): error is CustomErrorType {
  console.log(error);
  console.log(typeof (error as any).data.message);

  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof (error as any).data.message === 'string'
  );
}
