import json

dict = {'Records': 
        [{'eventVersion': '2.1', 
        'eventSource': 'aws:s3',
        'awsRegion': 'us-east-1',
        'eventTime': '2020-01-14T07:32:43.037Z', 
        'eventName': 'ObjectCreated:CompleteMultipartUpload',
        'userIdentity': {'principalId': 'AWS:AROA3WANFPMID2L4JX63P:c35dfb64-e683-4d8c-a323-e7615e79260e'}, 
        'requestParameters': {'sourceIPAddress': '172.16.1.20'}, 
        'responseElements': {'x-amz-request-id': '8DB5BCBAA4D7D6A9',
        'x-amz-id-2': 'z+SL8ExFhUf+lGizfy62cIn3UdWaUktQzI8Kq923iYrVz3XLgr/hnWXpxfizjjNtI7unCFzqlJkvCWzp+ECWEPIeDr6b3Jjx'},
        's3': {'s3SchemaVersion': '1.0', 
        'configurationId': 'invokeTranscode', 
        'bucket': {'name': 'sm-benfelip-video-input',
        'ownerIdentity': {'principalId': 'A1MDO4D63GCJAJ'}, 
        'arn': 'arn:aws:s3:::sm-benfelip-video-input'}, 
        'object': {'key': 'LAMBDA-oktank-logistics2020-01-14-06-59-15.mp4',
        'size': 539894981, 'eTag': '52bf2fc468797796dbfc7ffaef4d5353-65', 
        'sequencer': '005E1D6E97E6522D24'}}}]}


print(json.dumps(dict))