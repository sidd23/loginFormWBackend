# Login Form integration with Express backend

## Modules used
* Express
* `body-parser`
* `path`
* `fs`
* __Note: For more details, refer `./package.json`.__
___

## Features
* Basic client-side password validation using JS, wherein the password must satisfy the following criteria,
  * An uppercase letter
  * A smallcase letter
  * A number/digit
  * At least 8 characters
* Upon clicking the submit/`Login` button, a `POST` call is made to `<ip_addr>:<port>/check` which checks whether the entered username, password pair exists the `userRecords`.
* Exposes the following APIs in addition to the above,
  * `<ip_addr>:<port>/users`
    *  Responds to a `GET` call with the JSON contents of the site's `userRecords` (that is, username and password key-value pairs).
  * `<ip_addr>:<port>/update`
    * Accepts `POST` calls to update the list of the site's `userRecords`.
___