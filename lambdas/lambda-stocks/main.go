package lambda_stocks

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Request struct {
	StockTable string `json:"stock"`
}

type Response struct {
	Message string `json:"stock"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	paramValue := request.QueryStringParameters["param"]
	responseBody := fmt.Sprintf("Hello: %s", paramValue)
	fmt.Println(responseBody)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       responseBody,
	}, nil
}

func main() {
	lambda.Start(handler)
}

//sess := session.Must(session.NewSessionWithOptions(session.Options{
//	SharedConfigState: session.SharedConfigEnable,
//}))
//
//svc := dynamodb.New(sess)
//
//input := $dynamodb.GetItemInput{
//	TableName: aws.String(request.StockTable),
//	Key: map[string]*dynamodb.AttributeValue{
//		"keyName": {
//			S: aws.String("keyValue"),
//		},
//	},
//}
//
//result, err := svc.GetItem(input)
//
//if err != nil {
//	return Response{}, err
//}
//
//fmt.Printf("result is %s", result)
//
//return Response{
//	Message: fmt.Sprintf("Data from Dynamodb %s", request.StockTable),
//}, nil
