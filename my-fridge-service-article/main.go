package main

import (
	"context"
	"github.com/micro/go-micro"
	"log"

	// Import the generated protobuf code
	pb "github.com/realague/my_fridge_backend/my-fridge-service-article/proto/article"
)

type repository interface {
	Create(*pb.Article) (*pb.Article, error)
	GetAll() []*pb.Article
}

// Repository - Dummy repository, this simulates the use of a datastore
// of some kind. We'll replace this with a real implementation later on.
type Repository struct {
	articles []*pb.Article
}

// Create a new consignment
func (repo *Repository) Create(article *pb.Article) (*pb.Article, error) {
	updated := append(repo.articles, article)
	repo.articles = updated
	return article, nil
}

func (repo *Repository) GetAll() []*pb.Article {
	return repo.articles
}

// Service should implement all of the methods to satisfy the service
// we defined in our protobuf definition. You can check the interface
// in the generated code itself for the exact method signatures etc
// to give you a better idea.
type articleService struct {
	repo repository
}

// CreateConsignment - we created just one method on our service,
// which is a create method, which takes a context and a request as an
// argument, these are handled by the gRPC server.
func (s *articleService) CreateArticle(ctx context.Context, req *pb.Article, res *pb.Response) error {
	// Save our article
	article, err := s.repo.Create(req)
	if err != nil {
		return err
	}

	// Return matching the `Response` message we created in our
	// protobuf definition.
	res.Created = true
	res.Article = article
	return nil
}

// GetArticles -
func (s *articleService) GetArticles(ctx context.Context, req *pb.GetRequest, res *pb.Response) error {
	articles := s.repo.GetAll()
	res.Articles = articles
	return nil
}

func main() {

	repo := &Repository{}

	// Create a new service. Optionally include some options here.
	service := micro.NewService(

		// This name must match the package name given in your protobuf definition
		micro.Name("my-fridge.service.article"),
	)

	// Init will parse the command line flags.
	service.Init()

	// Register service
	if err := pb.RegisterArticleServiceHandler(service.Server(), &articleService{repo}); err != nil {
		log.Panic(err)
	}
	//pb.RegisterArticleServiceServer(s, &service{repo, pb.UnimplementedArticleServiceServer{}})

	// Run the server
	if err := service.Run(); err != nil {
		log.Panic(err)
	}

}
