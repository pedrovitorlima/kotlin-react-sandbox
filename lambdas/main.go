package main

import (
	"context"
	"fmt"
	lambda "github.com/aws/aws-lambda-go/lambda"
)

type MyEvent struct {
	Message string `json:"message"`
}

func HandleRequest(ctx context.Context, event MyEvent) (string, error) {
	return fmt.Sprintf("Hello, %s!", event.Message), nil
}

func main() {
	lambda.Start(HandleRequest)
}
