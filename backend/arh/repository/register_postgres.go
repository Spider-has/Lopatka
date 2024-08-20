package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/spider-has/lopata-docker"
)

type RegPostgres struct {
	db *sqlx.DB
}

func NewRegPostgres(db *sqlx.DB) *RegPostgres {
	return &RegPostgres{db: db}
}

func (r *RegPostgres) Create(peopleData lopata.RegistredUser) (int, error) {
	tx, err := r.db.Begin()
	if (err != nil) {
		return 0, err
	}

	var id int 
	createListQuery := fmt.Sprintf("INSERT INTO %s (user_name, user_email) VALUES ($1, $2) RETURNING id", registerTable)
	row := tx.QueryRow(createListQuery, peopleData.UserName, peopleData.UserEmail)
	if err := row.Scan(&id); err != nil {
		tx.Rollback()
		return 0, err
	}

	// тут должна быть вставка в таблицу, связывающую юзера и новость, но у нас дедлайн через неделю, не судьба
	// createUserNewQuery ....
	//_, err = tx.Exec()

	return id, tx.Commit()
}