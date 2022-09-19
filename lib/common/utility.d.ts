import { PublicKey } from '@solana/web3.js';
import { ay as ReplaceType } from '../type-665453b6.js';
import 'bn.js';
import '../marshmallow/index.js';
import '../marshmallow/buffer-layout.js';
import '../bignumber-cbebe552.js';
import '../module/token.js';
import './pubKey.js';
import '../raydium/token/type.js';
import './logger.js';
import 'pino';
import '../raydium/account/types.js';
import '../raydium/account/layout.js';

declare function sleep(ms: number): Promise<void>;
declare function getTimestamp(): number;
declare function jsonInfo2PoolKeys<T>(jsonInfo: T): ReplaceType<T, string, PublicKey>;

export { getTimestamp, jsonInfo2PoolKeys, sleep };
