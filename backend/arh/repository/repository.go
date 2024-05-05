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

type Repository struct {
	Authorization
	NewsList
	New
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		New: NewNewPostgres(db),
	}
}
