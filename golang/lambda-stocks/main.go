package lambda_stocks

import (
	"context"
)

type Request struct {
	StockTable string `json:"stock"`
}

type Response struct {
	Message string `json:"stock"`
}

func HandleRequest(ctx context.Context, request Request) (Response, error) { return Response{}, nil }

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

