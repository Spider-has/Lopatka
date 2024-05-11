package service

import (
	"github.com/spider-has/lopata-docker"
	"github.com/spider-has/lopata-docker/arh/repository"
)


type MonumentService struct {
	repo repository.Monument
}

func NewMonumentService(repo repository.Monument) *MonumentService {
	return &MonumentService{repo: repo}
}

func (s *MonumentService) Create(Monument lopata.Monuments) (int, error) {

	err := insertImageIntoStaticFolder(Monument.FirstScreenImgHref, Monument.FirstScreenImgName)
	if err != nil {
		return 0, err
	}
	for _, imageData := range Monument.MainContentImageData {
		err := insertImageIntoStaticFolder(imageData.Href, imageData.Name)
		if err != nil {
			return 0, err
		}
	}

	return s.repo.Create(Monument)
}

func (s *MonumentService) GetAll() ([]lopata.MonumentPreview, error) {
	return s.repo.GetAll()
}

func (s *MonumentService) GetById(id int) (lopata.Monuments, error){
	return s.repo.GetById(id)
}

func (s *MonumentService) DeleteById(id int) (error){
	return s.repo.DeleteById(id)
}

func (s *MonumentService) GetMapData() ([]lopata.MapData, error) {
	return s.repo.GetMapData()
}

func (s *MonumentService) UpdateById(Monument lopata.Monuments, id int) (error) {
	err := insertImageIntoStaticFolder(Monument.FirstScreenImgHref, Monument.FirstScreenImgName)
	if err != nil {
		return err
	}
	for _, imageData := range Monument.MainContentImageData {
		err := insertImageIntoStaticFolder(imageData.Href, imageData.Name)
		if err != nil {
			return err
		}
	}

	return s.repo.UpdateById(Monument, id)
}