# Running app in AWS
* Install AWS SAM 
* Package the code
* Config credentials
`` aws configure ``
* Package the code
``sam package --template-file stock-quote.yaml --output-template-file packaged-template.yaml --resolve-s3``
* Deploy
* ``sam deploy --template-file packaged-template.yaml --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM``