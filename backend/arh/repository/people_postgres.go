package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/spider-has/lopata-docker"
)

type PeoplePostgres struct {
	db *sqlx.DB
}

func NewPeoplePostgres(db *sqlx.DB) *PeoplePostgres {
	return &PeoplePostgres{db: db}
}

func (r *PeoplePostgres) Create(peopleData lopata.Peoples) (int, error) {
	tx, err := r.db.Begin()
	if (err != nil) {
		return 0, err
	}

	var id int 
	createListQuery := fmt.Sprintf("INSERT INTO %s (header, description, author_name, theme, creation_date, main_image, content) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", peoplesTable)
	row := tx.QueryRow(createListQuery, peopleData.Header, peopleData.Description, peopleData.AuthorName, peopleData.Theme, peopleData.Date, peopleData.FirstScreenImgName, peopleData.MainContent)
	if err := row.Scan(&id); err != nil {
		tx.Rollback()
		return 0, err
	}

	// тут должна быть вставка в таблицу, связывающую юзера и новость, но у нас дедлайн через неделю, не судьба
	// createUserNewQuery ....
	//_, err = tx.Exec()

	return id, tx.Commit()
}

func (r *PeoplePostgres) GetAll() ([]lopata.Peoplereview, error) {
	var peoplesData []lopata.Peoplereview
	query := fmt.Sprintf("SELECT id, header, author_name, creation_date, description, main_image, theme FROM %s", peoplesTable)
	err := r.db.Select(&peoplesData, query)
	return peoplesData, err
}


func (r *PeoplePostgres) GetById(id int) (lopata.Peoples, error) {
	var peopleData lopata.Peoples
	query := fmt.Sprintf("SELECT * FROM %s WHERE id = $1", peoplesTable)
	err := r.db.Get(&peopleData, query, id)
	return peopleData, err
}


func (r *PeoplePostgres) DeleteById(id int) (error) {
	query := fmt.Sprintf("DELETE FROM %s WHERE id = $1", peoplesTable)
	_,err := r.db.Exec(query, id)
	return err
}


func (r *PeoplePostgres) UpdateById(peopleData lopata.Peoples, id int) (error) {
	createListQuery := fmt.Sprintf("UPDATE %s SET header=$1, description=$2, author_name=$3, theme=$4, creation_date=$5, main_image=$6, content=$7 WHERE id=%d", peoplesTable, id)
	_, err := r.db.Exec(createListQuery, peopleData.Header, peopleData.Description, peopleData.AuthorName, peopleData.Theme, peopleData.Date, peopleData.FirstScreenImgName, peopleData.MainContent)
	return err
}

