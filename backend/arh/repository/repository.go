package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/spider-has/lopata-docker"
)

type Authorization interface {
	CreateUser(user lopata.User) (int, error)
	GetUser(userEmail, password string) (lopata.User, error)
}

type NewsList interface {
}

type New interface {
	Create(New lopata.News) (int, error)
	GetAll() ([]lopata.NewPreview, error)
	GetById(id int) (lopata.News, error)
	DeleteById(id int) error
	UpdateById(New lopata.News, id int) (error)
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
	Create(New lopata.Peoples) (int, error)
	GetAll() ([]lopata.Peoplereview, error)
	GetById(id int) (lopata.Peoples, error)
	DeleteById(id int) error
	UpdateById(New lopata.Peoples, id int) (error)
}

type Repository struct {
	Authorization
	NewsList
	New
	Monument
	People
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		New: NewNewPostgres(db),
		Monument: NewMonumentPostgres(db),
		People: NewPeoplePostgres(db),
	}
}
