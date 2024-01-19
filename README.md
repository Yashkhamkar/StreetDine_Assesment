To run this project locally you need to follow below steps:

1.Clone this repository 

2.run npm install script

3.then run nodemon index.js

4.Then Test API's on Postman or Thunderbird etc.

Architecture of this backend :-

When Employee is created in response Employee gets a token . 

This token is than used to verify if a employee is HR or other employee.

If user is HR he can get employee details and delete employee.

If employee is not HR he can just update his/her profile.

To implement this i have used jwt .

