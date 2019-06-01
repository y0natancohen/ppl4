import * as assert from "assert";
import {parse} from '../part3/L5-ast';
// import { parsedToString } from './imp/L3-value'
import { typeofExp, L5typeof } from '../part3/L5-typecheck';

declare var require: any;
const fs = require('fs');


const q2 : string = fs.readFileSync('./part2.l5','utf-8');


// assert.deepEqual(parse(`(L5 ` + q2 + ` (empty-tree?  '()))`),true);
// assert.deepEqual(parse(`(L5 ` + q2 + ` (empty-tree? '(1)))`),false);
// assert.deepEqual(parse(`(L5 ` + q2 + ` (empty-tree? 1))`),false);
// console.log(L5typeof(`(define (empty-tree? : (T1 -> boolean)) empty?) (empty-tree? (cons 1 2)))`));
assert.deepEqual(L5typeof(`(define (empty-tree? : (T1 -> boolean)) empty?)`), 'void');
assert.deepEqual(L5typeof(`(    empty-tree? : (T1 -> boolean)) empty?)`), 'void');
//
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (list? '()))`),true);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (list? (list 2 3)))`),true);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (list? (cons 2 3)))`),false);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (list? (cons (cons 2 3) (cons 1 2))))`),false);
//
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? '() '()))`),true);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? '(1 2) '(1 2)))`),true);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? '(1 2) '(2 1)))`),false);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? '(1 2) '(1 2 3)))`),false);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? '(#t "a" (2 'b)) '(#t "a" (2 'b))))`),true);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? '(1 '(2 3)) '(1 '(2 4))))`),false);
// assert.deepEqual(evalParse(`(L3 ` + q2 + ` (equal-list? 2 2))`),false);

// assert.deepEqual(parsedToString(evalParse(`(L3 ` + q2 + `  (append '(1 2 3) '(4 5 6)))`)),'(1 2 3 4 5 6)');
// assert.deepEqual(parsedToString(evalParse(`(L3 ` + q2 + `  (append3 '(1 2 3) '(4 5 6) 7))`)),'(1 2 3 4 5 6 7)');
// assert.deepEqual(parsedToString(evalParse(`(L3 ` + q2 + `  (pascal 5))`)),'(1 4 6 4 1)');

