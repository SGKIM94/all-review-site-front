'use strict';


export const SUCCESS = '200';
export const ERROR = '999';

export function isSuccessResponse(response: string): boolean {
return response !== SUCCESS;
}
