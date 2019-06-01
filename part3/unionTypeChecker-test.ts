// L5-typecheck
import { strict as assert } from 'assert';
import { L5typeof } from './L5-typecheck';
import {parseTE} from "./TExp";


// Example:
assert.deepEqual(parseTE("(number | boolean)"), parseTE("(boolean | number)"));

