#!/usr/bin/env node

'use strict';

var inquirer = require('inquirer');
var request = require('request');

inquirer.prompt([{
  type: 'input',
  message: 'Username',
  name: 'username'
}, {
  type: 'input',
  message: 'Email',
  name: 'email'
}, {
  type: 'password',
  message: 'Password',
  name: 'password'
}, {
  type: 'password',
  message: 'Confirm password',
  name: 'passwordConfirm'
}], function (answers) {
  if (answers.password !== answers.passwordConfirm) {
    console.error('Passwords did not match; please try again.');

    process.exit(1);
  }

  request.post({
    url: 'https://v1.peachapi.com//register',
    json: true,
    headers: {
      'User-Agent': 'Peach App/1.0.7 (iPhone; iOS 9.2; Scale/2.00)'
    },
    body: {
      email: answers.email,
      name: answers.username,
      password: answers.password
    }
  }, function (err, response, body) {
    console.log();
    console.log("Here's the output:");
    console.log();

    console.log(JSON.stringify(body, null, '  '));
  });
});
