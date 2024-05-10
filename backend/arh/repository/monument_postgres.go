package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/spider-has/lopata-docker"
)

type MonumentPostgres struct {
	db *sqlx.DB
}

func NewMonumentPostgres(db *sqlx.DB) *MonumentPostgres {
	return &MonumentPostgres{db: db}
}

func (r *MonumentPostgres) Create(monument lopata.Monuments) (int, error) {
	tx, err := r.db.Begin()
	if (err != nil) {
		return 0, err
	}

	var id int 
	createListQuery := fmt.Sprintf("INSERT INTO %s (header, description, author_name, creation_date, main_image, monument_type, culture_type, era, district, coords, content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id", monumentsTable)
	row := tx.QueryRow(createListQuery, monument.Header, monument.Description, monument.AuthorName, monument.Date, monument.FirstScreenImgName, monument.MonumentType, monument.CultureType, monument.Era, monument.District, monument.Coordinates, monument.MainContent)
	if err := row.Scan(&id); err != nil {
		tx.Rollback()
		return 0, err
	}

	// тут должна быть вставка в таблицу, связывающую юзера и новость, но у нас дедлайн через неделю, не судьба
	// createUserNewQuery ....
	//_, err = tx.Exec()

	return id, tx.Commit()
}

func (r *MonumentPostgres) GetAll() ([]lopata.MonumentPreview, error) {
	var monuments []lopata.MonumentPreview
	query := fmt.Sprintf("SELECT id, header, description, author_name, creation_date, main_image, monument_type, culture_type, era, district, coords FROM %s", monumentsTable)
	err := r.db.Select(&monuments, query)
	return monuments, err
}


func (r *MonumentPostgres) GetById(id int) (lopata.Monuments, error) {
	var monument lopata.Monuments
	query := fmt.Sprintf("SELECT * FROM %s WHERE id = $1", monumentsTable)
	err := r.db.Get(&monument, query, id)
	return monument, err
}


func (r *MonumentPostgres) DeleteById(id int) (error) {
	query := fmt.Sprintf("DELETE FROM %s WHERE id = $1", monumentsTable)
	_,err := r.db.Exec(query, id)
	return err
}


func (r *MonumentPostgres) UpdateById(monument lopata.Monuments, id int) (error) {
	createListQuery := fmt.Sprintf("UPDATE %s SET header=$1, description=$2, author_name=$3, creation_date=$4, main_image=$5, monument_type=$6, culture_type=$7, era=$8, district=$9, coords=$10, content=$11 WHERE id=%d", monumentsTable, id)
	_, err := r.db.Exec(createListQuery, monument.Header, monument.Description, monument.AuthorName, monument.Date, monument.FirstScreenImgName, monument.MonumentType, monument.CultureType, monument.Era, monument.District, monument.Coordinates, monument.MainContent)
	return err
}

