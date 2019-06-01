// L5-typecheck
import { strict as assert } from 'assert';
import { L5typeof } from './L5-typecheck';


// Example:
assert.deepEqual(L5typeof("(number | boolean)"), L5typeof("(boolean | number)"));

