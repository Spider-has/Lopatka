package handlers

import (
	"fmt"

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

	router.Use(CORSMiddleware())

	router.Static("/static", "./static")

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
		auth.POST("/token-check", h.userIdentity)
	}

	api := router.Group("/api")
	{
		news := api.Group("/news")
		{
			public := news.Group("/public")
			{
				public.GET("/", h.getAllNews)
				public.GET("/:id", h.getNewById)
			}
			private := news.Group("/private", h.userIdentity)
			{
				private.POST("/", h.createNew)
				private.PUT("/:id", h.updateNew)
				private.DELETE("/:id", h.deleteNew)
			}
			
		}
	}

	return router
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		fmt.Println(c.Request.Method)

		if c.Request.Method == "OPTIONS" {
			fmt.Println("OPTIONS")
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}
