import { S3Client } from "@aws-sdk/client-s3"

export const listAllObjects = async (Bucket, Prefix = "", onlyKeys = true, S3Client = new S3Client(), ContinuationToken = null, results = []) => {
  const res = await S3Client.listObjectsV2({Bucket, Prefix, ContinuationToken}).promise();
  const reducedRes = onlyKeys ? res.Contents.map( k => k.Key ) : res.Contents;
  results = [ ...results, ...reducedRes];
  if(!!res.IsTruncated){
    return await listAllObjects( Bucket, Prefix, onlyKeys, S3Client, res.NextContinuationToken, results);
  }
  return results;
}

