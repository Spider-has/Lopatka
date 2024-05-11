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
	DeleteById(id int) (error)
	UpdateById(user lopata.News, id int) (error)
}

type Monument interface {
	Create(user lopata.Monuments) (int, error)
	GetAll() ([]lopata.MonumentPreview, error)
	GetById(id int) (lopata.Monuments, error)
	DeleteById(id int) (error)
	UpdateById(user lopata.Monuments, id int) (error)
	GetMapData() ([]lopata.MapData, error)
}

type People interface {
	Create(user lopata.Peoples) (int, error)
	GetAll() ([]lopata.Peoplereview, error)
	GetById(id int) (lopata.Peoples, error)
	DeleteById(id int) (error)
	UpdateById(user lopata.Peoples, id int) (error)
}

type Service struct {
	Authorization
	NewsList
	New
	Monument
	People
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		New: NewEditorService(repos.New),
		Monument: NewMonumentService(repos.Monument),
		People: NewPeopleService(repos.People),
	}
}
