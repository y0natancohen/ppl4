// L5-typecheck
import { strict as assert } from 'assert';
import { checkCompatibleTypes } from './L5-typecheck';
import { makeBoolTExp, makeNumTExp, makeProcTExp, makeTVar, makeVoidTExp, parseTE, unparseTExp } from './TExp';


// Comparing 2 atomic types
assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeNumTExp()),    false);
assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeBoolTExp()),   true);
