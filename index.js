const AWS = require("aws-sdk");

const listAllObjects = async (Bucket, Prefix = "", onlyKeys = true, client = new AWS.S3(), ContinuationToken = null, results = []) => {
  const res = await client.listObjectsV2({Bucket, Prefix, ContinuationToken}).promise();
  const reducedRes = onlyKeys ? res.Contents.map( k => k.Key ) : res.Contents;
  results = [ ...results, ...reducedRes];
  if(!!res.IsTruncated){
    return await listAllObjects( S3Client, Bucket, Prefix, onlyKeys, client, res.NextContinuationToken, results);
  }
  return results;
}

exports.listAllObjects = listAllObjects;
