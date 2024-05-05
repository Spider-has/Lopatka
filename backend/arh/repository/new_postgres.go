package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/spider-has/lopata-docker"
)

type NewPostgres struct {
	db *sqlx.DB
}

func NewNewPostgres(db *sqlx.DB) *NewPostgres {
	return &NewPostgres{db: db}
}

func (r *NewPostgres) Create(new lopata.News) (int, error) {
	tx, err := r.db.Begin()
	if (err != nil) {
		return 0, err
	}

	var id int 
	createListQuery := fmt.Sprintf("INSERT INTO %s (header, description, author_name, theme, creation_date, main_image, content) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", newsTable)
	row := tx.QueryRow(createListQuery, new.Header, new.Description, new.AuthorName, new.Theme, new.Date, new.FirstScreenImgName, new.MainContent)
	if err := row.Scan(&id); err != nil {
		tx.Rollback()
		return 0, err
	}

	// тут должна быть вставка в таблицу, связывающую юзера и новость, но у нас дедлайн через неделю, не судьба
	// createUserNewQuery ....
	//_, err = tx.Exec()

	return id, tx.Commit()
}

func (r *NewPostgres) GetAll() ([]lopata.NewPreview, error) {
	var news []lopata.NewPreview
	query := fmt.Sprintf("SELECT id, header, author_name, creation_date, description, main_image, theme FROM %s", newsTable)
	err := r.db.Select(&news, query)
	return news, err
}


func (r *NewPostgres) GetById(id int) (lopata.News, error) {
	var new lopata.News
	query := fmt.Sprintf("SELECT * FROM %s WHERE id = $1", newsTable)
	err := r.db.Get(&new, query, id)
	return new, err
}


func (r *NewPostgres) DeleteById(id int) (error) {
	query := fmt.Sprintf("DELETE FROM %s WHERE id = $1", newsTable)
	_,err := r.db.Exec(query, id)
	return err
}


func (r *NewPostgres) UpdateById(new lopata.News, id int) (error) {
	createListQuery := fmt.Sprintf("UPDATE %s SET header=$1, description=$2, author_name=$3, theme=$4, creation_date=$5, main_image=$6, content=$7 WHERE id=%d", newsTable, id)
	_, err := r.db.Exec(createListQuery, new.Header, new.Description, new.AuthorName, new.Theme, new.Date, new.FirstScreenImgName, new.MainContent)
	return err
}

