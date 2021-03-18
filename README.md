# s3-list-all-the-objects
A simple, small library to abstract the mechanism to fetch all the objects in a bucket (No pagination handling required) with prefix support.



This is just a simple abstraction that removes the need to watch for paginated results and returns a list of all the objects in the bucket.. you can also include the flag (defaults to true) to receive only an array of object keys ( strings ) and not an array of objects.

Example usage:
```js
const aws = require('aws-sdk');
const s3 = new aws.S3();
const { listAllObjects } = require('s3-list-all-the-objects');

const test = async () => {
  const myObjects = await listAllObjects('my_bucket_name', 'optional_prefix'); // if you want to get the whole object rather than just the ky, pass `false` as the 3rd parameter
  console.log('Array of object keys ==> ', myObjects);
}

test();
```