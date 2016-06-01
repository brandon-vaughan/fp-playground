'use strict';

/**
 * Testing out features of traverse 
 * Inspiration from https://medium.com/@drboolean/divide-and-conquer-with-algebraic-structures-14070106fb4#.3mmgtnoon
 */

import Id from 'fantasy-identities';
import { Map } from 'immutable-ext';
import { compose, traverse } from 'ramda';

// addOne :: Int -> Int
const addOne = x => x + 1;

// incId :: Int -> Id (Int)
const incId = x => Id.of(addOne(x));

// mapIncId :: a -> Id (Map (a))
const mapIncId = (x) => Map(x).traverse(Id.of, incId);

// prog :: a -> Id (Map (Map (a)))
const prog = Map({a: {one: 1}, b: {two: 2}})
                .traverse(Id.of, coMapIncId);

/** Using compose and point-free **/

// coIncId :: Int -> Id (Int)
const coIncId = compose(Id.of, addOne);

// mapIncId :: a -> Id (Map (a))
const coMapIncId = compose(traverse(Id.of, coIncId), Map);

// coProg :: a -> Id (Map (Map (a)))
const coProg = compose(traverse(Id.of, coMapIncId), Map);

