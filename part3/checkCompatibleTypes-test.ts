// L5-typecheck
import {strict as assert} from 'assert';
import {checkCompatibleTypes} from './L5-typecheck';
import {
    makeBoolTExp, makeEmptyTupleTExp, makeNonEmptyTupleTExp,
    makeNumTExp,
    makeProcTExp, makeStrTExp,
    makeTVar,
    makeUnionTExp,
    makeVoidTExp,
    parseTE,
    unparseTExp
} from './TExp';

//todo: add task + test for combine union (number | number ) into number

// Comparing 2 atomic types
assert.deepEqual(checkCompatibleTypes(makeEmptyTupleTExp(), makeUnionTExp([makeEmptyTupleTExp(), makeTVar("bi")])), true);
assert.deepEqual(checkCompatibleTypes(makeNonEmptyTupleTExp([makeBoolTExp(), makeStrTExp()]),
    makeUnionTExp([makeEmptyTupleTExp(), makeTVar("bi"), makeNonEmptyTupleTExp([makeBoolTExp(), makeStrTExp()])] )), true);
assert.deepEqual(checkCompatibleTypes(makeTVar("hi"), makeUnionTExp([makeTVar("hi"), makeTVar("bi")])), true);
assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeNumTExp()), false);
assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeBoolTExp()), true);


assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeUnionTExp([makeNumTExp(), makeStrTExp()])), false);
assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeUnionTExp([makeBoolTExp(), makeNumTExp()])), true);
assert.deepEqual(checkCompatibleTypes(makeVoidTExp(), makeUnionTExp([makeVoidTExp()])), true);


assert.deepEqual(checkCompatibleTypes(makeBoolTExp(), makeProcTExp([makeBoolTExp()],makeNumTExp())), false);


assert.deepEqual(checkCompatibleTypes(makeUnionTExp([makeBoolTExp(), makeNumTExp()]), makeNumTExp()), false);

// union - union
assert.deepEqual(checkCompatibleTypes(makeUnionTExp([makeBoolTExp(), makeNumTExp()]),
    makeUnionTExp([makeBoolTExp(), makeStrTExp()])), false);
assert.deepEqual(checkCompatibleTypes(makeUnionTExp([makeBoolTExp(), makeNumTExp()]),
    makeUnionTExp([makeBoolTExp(), makeStrTExp(), makeNumTExp()])), true);

assert.deepEqual(checkCompatibleTypes(makeUnionTExp([makeStrTExp()]),
    makeProcTExp([makeStrTExp(), makeNumTExp()],makeNumTExp())), false);


assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeStrTExp(), makeNumTExp()], makeNumTExp()), makeNumTExp()), false);

assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeStrTExp(), makeNumTExp()], makeNumTExp()),
    makeUnionTExp([makeBoolTExp(), makeStrTExp()])), false);


//  proc proc
assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeStrTExp(), makeNumTExp()], makeNumTExp()),
    makeProcTExp([makeNumTExp(), makeStrTExp()], makeNumTExp())), false);
assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeStrTExp(), makeNumTExp()], makeNumTExp()),
    makeProcTExp([makeStrTExp(), makeUnionTExp([makeNumTExp(), makeBoolTExp()])], makeUnionTExp([makeNumTExp(), makeBoolTExp()]))), true);

assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeNumTExp(), makeNumTExp(), makeNumTExp()], makeNumTExp()),
    makeProcTExp([makeNumTExp(), makeUnionTExp([makeNumTExp(), makeBoolTExp()]), makeNumTExp()], makeUnionTExp([makeNumTExp(), makeBoolTExp()]))), true);


// diff in return val
assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeStrTExp(), makeNumTExp()], makeNumTExp()),
    makeProcTExp([makeStrTExp(), makeUnionTExp([makeNumTExp(), makeBoolTExp()])], makeUnionTExp([makeStrTExp(), makeBoolTExp()]))), false);
// diff in num of args
assert.deepEqual(checkCompatibleTypes(makeProcTExp([makeStrTExp(), makeNumTExp(), makeStrTExp()], makeNumTExp()),
    makeProcTExp([makeStrTExp(), makeUnionTExp([makeNumTExp(), makeBoolTExp()])], makeUnionTExp([makeStrTExp(), makeBoolTExp()]))), false);
