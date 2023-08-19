package database

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/stretchr/testify/mock"
	"reflect"
	"testing"
)

type MockDynamoDBClient struct {
	dynamodbiface.DynamoDBAPI
	mock.Mock
}

func (m *MockDynamoDBClient) Scan(input *dynamodb.ScanInput) (*dynamodb.ScanOutput, error) {
	args := m.Called(input)
	return args.Get(0).(*dynamodb.ScanOutput), args.Error(1)
}

func TestTickersFromDynamoDB(t *testing.T) {
	mockSvc := &MockDynamoDBClient{}

	expectedInput := &dynamodb.ScanInput{
		TableName: aws.String("Stocks"),
		AttributesToGet: []*string{
			aws.String("ticker"),
		},
	}

	expectedOutput := &dynamodb.ScanOutput{
		Items: []map[string]*dynamodb.AttributeValue{
			{
				"ticker": {S: aws.String("ABCD")},
			},
			{
				"ticker": {S: aws.String("XYZA")},
			},
		},
	}

	mockSvc.On("Scan", expectedInput).Return(expectedOutput, nil)

	dynamodbQuery := FetchStocks{mockSvc}

	stocks, error := dynamodbQuery.fetch()

	if error != nil {
		t.Errorf("Unexpected error => %v", error)
	}

	expectedStocks := []string{"ABCD", "XYZA"}
	if !reflect.DeepEqual(stocks, expectedStocks) {
		t.Errorf("Expected %s to be %s", expectedStocks, stocks)
	}
}
