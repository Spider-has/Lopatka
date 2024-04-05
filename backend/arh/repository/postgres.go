package repository

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
)

const (
	usersTable          = "users"
	newsTable           = "new_item"
	monumentsTable      = "monument_item"
	usersNewsTable      = "news_lists"
	usersMonumentsTable = "monuments_lists"
)

type Config struct {
	Host     string
	Port     string
	Username string
	Password string
	DBName   string
	SSLMode  string
}

func NewPostgresDB(cfg Config) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.Username, cfg.DBName, cfg.Password, cfg.SSLMode))

	if err != nil {
		log.Fatalf("db err: %s", err.Error())
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("db err: %s", err.Error())
		return nil, err
	}

	log.Printf("db sucess!!!!!")

	return db, nil
}
