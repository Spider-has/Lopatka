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
}

type Repository struct {
	Authorization
	NewsList
	New
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
	}
}
