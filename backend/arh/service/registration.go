package service

import (
	"github.com/spider-has/lopata-docker"
	"github.com/spider-has/lopata-docker/arh/repository"
)


type UserService struct {
	repo repository.RegistredUsers
}

func NewRegService(repo repository.RegistredUsers) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Create(New lopata.RegistredUser) (int, error) {

	return s.repo.Create(New)
}
