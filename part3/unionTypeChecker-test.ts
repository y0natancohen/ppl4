// L5-typecheck
import { strict as assert } from 'assert';
import { L5typeof } from './L5-typecheck';
import {makeBoolTExp, makeNumTExp, makeProcTExp, makeStrTExp, makeUnionTExp, parseTE} from "./TExp";
import {makeDefineExp, makeNumExp, makeVarDecl, parse} from "./L5-ast";


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