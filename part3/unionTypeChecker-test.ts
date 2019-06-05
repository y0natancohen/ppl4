// L5-typecheck
import { strict as assert } from 'assert';
import { L5typeof } from './L5-typecheck';
import {makeBoolTExp, makeNumTExp, makeProcTExp, makeStrTExp, makeUnionTExp, parseTE} from "./TExp";
import {makeDefineExp, makeIfExp, makeNumExp, makeVarDecl, parse} from "./L5-ast";


// Example:
assert.deepEqual(parseTE("(number | boolean)"), parseTE("(boolean | number)"));


assert.deepEqual(parse("(define (a : (number | (number | string | ((boolean | string) -> number)))) 1)"),
    makeDefineExp(
        makeVarDecl("a", makeUnionTExp([makeNumTExp(), makeStrTExp(), makeProcTExp([makeUnionTExp([makeBoolTExp(), makeStrTExp()])], makeNumTExp())])),
        makeNumExp(1)));

assert.deepEqual(parse("(define (a : (number | number)) 1)"),
    makeDefineExp(
        makeVarDecl("a", makeNumTExp()),
        makeNumExp(1)));

assert.deepEqual(parse("(define (a : ((number -> number) | (number -> number) )) 1)"),
    makeDefineExp(
        makeVarDecl("a", makeProcTExp([makeNumTExp()],makeNumTExp())),
        makeNumExp(1)));

assert.deepEqual(parse("(define (a : (string | (number -> number))) 1)"),
    makeDefineExp(makeVarDecl("a", makeUnionTExp(
        [makeStrTExp(), makeProcTExp([makeNumTExp()], makeNumTExp())]
    )), makeNumExp(1)));

// if -tests
assert.deepEqual(L5typeof("(if (> 1 2) 1 2)"), "number");
assert.deepEqual(L5typeof("(if (> 1 2) #t (lambda ((x : number)) : number x))"), "(boolean | (number -> number))");
assert.deepEqual(L5typeof("(if (> 1 2) #t (if (> 2 3) 1 eq?))"), "(boolean | (number | (T1 * T2 -> boolean)))");
assert.deepEqual(L5typeof("(if (> 1 2) #t (if (> 2 3) 1 2))"), "(boolean | number)");