# Login Form integration with Express backend

## Modules used
* `Express`
* `body-parser`
* `path`
* `mongoose`
* `morgan`
* __Note: For more details, refer `./package.json`.__
___

## Features
* Basic client-side password validation using JS, wherein the password should satisfy the following criteria,
  * An uppercase letter
  * A smallcase letter
  * A number/digit
  * At least 8 characters
* User data is persisted using MongoDB.
___

## APIs
* `/users`
  * HTTP GET method
  * Returns a JSON object with all users data (except user passwords).
* `/create`
  * HTTP POST method
  * Parameters
    * A JSON object,
      ```json
      {
        firstName: <first_name>,
        familyName: <family_name>,
        username: <username>,
        password: <password>
      }
      ```
  * Returns
    * If successfull,
      * Created record's unique id/index value
    * If failure,
      * If entered `username` already exists,
        * String: "username exists"
      * Else Javascript's `null` object
* `/profile/id`
  * HTTP GET method
  * Returns
    * A JSON object with that particular user record'sdetails (except password).
* `/check`
  * HTTP POST method
  * Brief
    * Checks if a user instance/record/document withthe provided fields exists in the database.
  * Parameters
    * A JSON object,
      ```json
      {
        username: <username>,
        password: <password>
      }
      ```
  * Returns
    * If successfull,
      * Created record's unique id/index value
    * If failure,
      * If MongoDB/mongoose error, error is handledinternally.
      * Else Javascript's `null` object
___

## Views
* `/`
  * Renders `index.html` page.
  * Provides link to relevant pages.
* `/login`
  * Renders `login.html` page.
  * Provides a form for logging in.
* `/signup`
  * Renders `signup.html` page.
  * Provides a form for signin up.
  * Does basic password validation on the frontend using vanilla JavaScript.
___