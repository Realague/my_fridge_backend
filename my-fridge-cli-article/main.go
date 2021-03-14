package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	"context"

	pb "github.com/realague/my_fridge_backend/my-fridge-service-article/proto/article"

	"google.golang.org/grpc"
)

const (
	address         = "localhost:8080"
	defaultFilename = "article.json"
)

func parseFile(file string) (*pb.Article, error) {
	var article *pb.Article
	data, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}
	_ = json.Unmarshal(data, &article)
	return article, err
}

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()
	client := pb.NewArticleServiceClient(conn)

	// Contact the server and print out its response.
	file := defaultFilename
	if len(os.Args) > 1 {
		file = os.Args[1]
	}

	consignment, err := parseFile(file)

	if err != nil {
		log.Fatalf("Could not parse file: %v", err)
	}

	r, err := client.CreateArticle(context.Background(), consignment)
	if err != nil {
		log.Fatalf("Could not greet: %v", err)
	}
	log.Printf("Created: %t", r.Created)
	getAll, err := client.GetArticles(context.Background(), &pb.GetRequest{})
	if err != nil {
		log.Fatalf("Could not list articles: %v", err)
	}
	for _, v := range getAll.Articles {
		log.Println(v)
	}
}