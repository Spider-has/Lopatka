package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/spider-has/lopata-docker/arh/service"
)

type Handler struct {
	services *service.Service
}

func NewService(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
	}

	api := router.Group("/api")
	{
		news := api.Group("/news")
		{
			news.POST("/", h.createNew)
			news.GET("/", h.getAllNews)
			news.GET("/:id", h.getNewById)
			news.PUT("/:id", h.updateNew)
			news.DELETE("/:id", h.deleteNew)
		}
	}
	return router
}
