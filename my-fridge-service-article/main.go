package main

import (
	"context"
	"log"
	"net"
	"sync"

	// Import the generated protobuf code
	pb "github.com/realague/my_fridge_backend/my-fridge-service-article/proto/article"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":50051"
)

type repository interface {
	Create(*pb.Article) (*pb.Article, error)
}

// Repository - Dummy repository, this simulates the use of a datastore
// of some kind. We'll replace this with a real implementation later on.
type Repository struct {
	mu           sync.RWMutex
	articles []*pb.Article
}

// Create a new consignment
func (repo *Repository) Create(article *pb.Article) (*pb.Article, error) {
	repo.mu.Lock()
	updated := append(repo.articles, article)
	repo.articles = updated
	repo.mu.Unlock()
	return article, nil
}

// Service should implement all of the methods to satisfy the service
// we defined in our protobuf definition. You can check the interface
// in the generated code itself for the exact method signatures etc
// to give you a better idea.
type service struct {
	repo repository
	pb.UnimplementedArticleServiceServer
}

// CreateConsignment - we created just one method on our service,
// which is a create method, which takes a context and a request as an
// argument, these are handled by the gRPC server.
func (s *service) CreateArticle(ctx context.Context, req *pb.Article) (*pb.Response, error) {

	// Save our consignment
	article, err := s.repo.Create(req)
	if err != nil {
		return nil, err
	}

	// Return matching the `Response` message we created in our
	// protobuf definition.
	return &pb.Response{Created: true, Article: article}, nil
}

func main() {

	repo := &Repository{}

	// Set-up our gRPC server.
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()

	// Register our service with the gRPC server, this will tie our
	// implementation into the auto-generated interface code for our
	// protobuf definition.
	pb.RegisterArticleServiceServer(s, &service{repo, pb.UnimplementedArticleServiceServer{}})

	// Register reflection service on gRPC server.
	reflection.Register(s)

	log.Println("Running on port:", port)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
