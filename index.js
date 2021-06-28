

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const listAllObjects = async (Bucket, Prefix = "", onlyKeys = true, ContinuationToken = null, results = []) => {
  const res = await s3.listObjectsV2({Bucket, Prefix, ContinuationToken}).promise();
  const reducedRes = onlyKeys ? res.Contents.map( k => k.Key ) : res.Contents;
  results = [ ...results, ...reducedRes];
  if(!!res.IsTruncated){
    return await listAllObjects( Bucket, Prefix, onlyKeys, res.NextContinuationToken, results);
  }
  return results;
}

exports.listAllObjects = listAllObjects;
