package main

import (
	"fmt"
	"os"

	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"github.com/spider-has/lopata-docker"
	handlers "github.com/spider-has/lopata-docker/arh/handler"
	"github.com/spider-has/lopata-docker/arh/repository"
	"github.com/spider-has/lopata-docker/arh/service"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "fuck!!")
}

func main() {
	logrus.SetFormatter(new(logrus.JSONFormatter))

	if err := GetConfigData(); err != nil {
		logrus.Fatalf("error while reading configs: %s", err.Error())
	}

	server := new(lopata.Server)

	if err := godotenv.Load(); err != nil {
		logrus.Fatalf("error loading env variables: %s", err.Error())
	}

	db, err := repository.NewPostgresDB(repository.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetString("db.port"),
		Username: viper.GetString("db.username"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   viper.GetString("db.dbname"),
		SSLMode:  viper.GetString("db.selmode"),
	})

	repos := repository.NewRepository(db)

	services := service.NewService(repos)

	handlers := handlers.NewService(services)

	if err != nil {
		logrus.Fatalf("db err: %s", err.Error())
	}

	router := mux.NewRouter()
	router.HandleFunc("/", handler)
	logrus.Printf("Server is running at port: %s", viper.GetString("port"))

	err = server.Run(viper.GetString("port"), handlers.InitRoutes())
	if err != nil {
		logrus.Fatal(err)
	}
}

func GetConfigData() error {
	viper.AddConfigPath("configs")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
