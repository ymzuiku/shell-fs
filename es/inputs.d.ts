import { resolve } from 'path';
export { resolve };
export declare const sleep: (ms: number) => Promise<{}>;
export declare const md5: (data: string, slice?: number) => string;
export declare const pwd: (...args: string[]) => string;
export declare const argv: string[];
export declare const inputs: <S>(defParams: S, logic: any) => Promise<void>;
