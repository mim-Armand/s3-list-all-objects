const AWS = require("aws-sdk");

const listAllObjects = async (Bucket, Prefix = "", onlyKeys = true, S3Client = new AWS.S3(), ContinuationToken = null, results = []) => {
  const res = await S3Client.listObjectsV2({Bucket, Prefix, ContinuationToken}).promise();
  const reducedRes = onlyKeys ? res.Contents.map( k => k.Key ) : res.Contents;
  results = [ ...results, ...reducedRes];
  if(!!res.IsTruncated){
    return await listAllObjects( S3Client, Bucket, Prefix, onlyKeys, S3Client, res.NextContinuationToken, results);
  }
  return results;
}

exports.listAllObjects = listAllObjects;
