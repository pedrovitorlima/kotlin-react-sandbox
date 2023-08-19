package database

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
)

type Stock struct {
	ticker string
}

type FetchDynamodb interface {
	fetch() ([]string, error)
}

type FetchStocks struct {
	svc dynamodbiface.DynamoDBAPI
}

func (f FetchStocks) fetch() ([]string, error) {
	result, err := f.scanAllStocks()

	if err != nil {
		return nil, err
	}

	var allTickers []string
	for _, item := range result.Items {
		var ticker = aws.StringValue(item["ticker"].S)
		allTickers = append(allTickers, ticker)
	}

	return allTickers, nil
}

func (f FetchStocks) scanAllStocks() (*dynamodb.ScanOutput, error) {
	tableName := "Stocks"

	input := &dynamodb.ScanInput{
		TableName: aws.String(tableName),
		AttributesToGet: []*string{
			aws.String("ticker"),
		},
	}

	result, err := f.svc.Scan(input)
	return result, err
}

func (f FetchStocks) buildSession() *session.Session {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))
	return sess
}
