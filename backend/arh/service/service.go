package service

import (
	"github.com/spider-has/lopata-docker"
	"github.com/spider-has/lopata-docker/arh/repository"
)

type Authorization interface {
	CreateUser(user lopata.User) (int, error)
	GenerateToken(userEmail, password string) (string, error)
	ParseToken(token string) (int, error) 
}

type NewsList interface {
}

type New interface {
	Create(user lopata.News) (int, error)
	GetAll() ([]lopata.NewPreview, error)
	GetById(id int) (lopata.News, error)
}

type Service struct {
	Authorization
	NewsList
	New
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		New: NewEditorService(repos.New),
	}
}
