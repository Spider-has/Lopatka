package service

import (
	"encoding/base64"
	"os"
	"strings"

	"github.com/sirupsen/logrus"
	"github.com/spider-has/lopata-docker"
	"github.com/spider-has/lopata-docker/arh/repository"
)


type EditorService struct {
	repo repository.New
}

func NewEditorService(repo repository.New) *EditorService {
	return &EditorService{repo: repo}
}

func (s *EditorService) Create(New lopata.News) (int, error) {

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

func (s *EditorService) GetAll() ([]lopata.NewPreview, error) {
	return s.repo.GetAll()
}

func (s *EditorService) GetById(id int) (lopata.News, error){
	return s.repo.GetById(id)
}

func (s *EditorService) DeleteById(id int) (error){
	return s.repo.DeleteById(id)
}

const staticImageStorage = "static/post_images/"

func insertImageIntoStaticFolder(codeImgbase64, imgName string) error {
	_, err := os.Stat(staticImageStorage + imgName)
	if err != nil {
		if os.IsNotExist(err) { 
			logrus.Printf("file %s not exist", imgName)
			b64data := codeImgbase64[strings.IndexByte(codeImgbase64, ',')+1:]
			img, err := base64.StdEncoding.DecodeString(b64data)
			if err != nil {
				return err
			}

			file, err := os.Create(staticImageStorage + imgName)
			if err != nil {
				return err
			}
			defer file.Close()

			_, err = file.Write(img)
			if err != nil {
				return err
			}
			return nil
		} 
	}
	logrus.Printf("file %s already exist", imgName)
	return nil
}

func (s *EditorService) UpdateById(New lopata.News, id int) (error) {
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