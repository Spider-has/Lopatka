package service

import (
	"github.com/spider-has/lopata-docker"
	"github.com/spider-has/lopata-docker/arh/repository"
)


type PeopleService struct {
	repo repository.People
}

func NewPeopleService(repo repository.People) *PeopleService {
	return &PeopleService{repo: repo}
}

func (s *PeopleService) Create(New lopata.Peoples) (int, error) {

	err := insertImageIntoStaticFolder(New.FirstScreenImgHref, New.FirstScreenImgName)
	if err != nil {
		return 0, err
	}
	for _, imageData := range New.MainContentImageData {
		err := insertImageIntoStaticFolder(imageData.Href, imageData.Name)
		if err != nil {
			return 0, err
		}
	}

	return s.repo.Create(New)
}

func (s *PeopleService) GetAll() ([]lopata.Peoplereview, error) {
	return s.repo.GetAll()
}

func (s *PeopleService) GetById(id int) (lopata.Peoples, error){
	return s.repo.GetById(id)
}

func (s *PeopleService) DeleteById(id int) (error){
	return s.repo.DeleteById(id)
}

func (s *PeopleService) UpdateById(New lopata.Peoples, id int) (error) {
	err := insertImageIntoStaticFolder(New.FirstScreenImgHref, New.FirstScreenImgName)
	if err != nil {
		return err
	}
	for _, imageData := range New.MainContentImageData {
		err := insertImageIntoStaticFolder(imageData.Href, imageData.Name)
		if err != nil {
			return err
		}
	}

	return s.repo.UpdateById(New, id)
}