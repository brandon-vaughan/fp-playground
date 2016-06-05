'use strict';

/**
 * Validation with folktale data.validation
 * Using applicative functors to manage validation.
 */

const Validation = require('data.validation');
const { Success, Failure } = Validation;
const emailValidator = require('email-validator');
const { compose, curry } = require('ramda');

// validEmail :: String -> Success Email | Failure String
const validEmail = x => emailValidator.validate(x) ? Success(x)
                                                   : Failure(['Please make sure your email is valid.']);
// validAmount :: a -> Success a | Failture String
const validAmount = x => x.length ? Success(x)
                                  : Failure(['Please choose one']);

// validProp :: prop -> a -> Success a | Failure String
const validProp = (prop, x) => x[prop].length ? Success(x)
                                              : Failure([`${prop} is required.`]);

// validPrice :: Int -> Success Int | Failture String
const validPrice = (x) => x.price >= 0 ? Success(x)
                                       : Failure('Price must be 0 or greater.']);

// isEmailValid :: String -> Success Email | Failure String
const isEmailValid = x => Success(curry((y, z) => x))
                            .ap(validAmount(x))
                            .ap(validEmail(x));

// isTicketValid :: Ticket -> Success Ticket | Failure String
const isTicketValid = x => Success(curry((y, z) => x))
                            .ap(validPrice('title', x))
                            .ap(validProp('title', x))

console.log('INVALID_EMAIL', isEmailValid('emailatdomain.com'))
console.log('VALID_EMAIL', isEmailValid('email@domain.com'))

console.log('INVALID TICKET', isTicketValid({title: '', price: 0}))
console.log('VALID TICKET', isTicketValid({title: 'Free Ticket', price: 0}))