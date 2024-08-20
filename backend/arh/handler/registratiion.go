package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/spider-has/lopata-docker"
)

func (h *Handler) createNewRegistred(c *gin.Context) {
	var input lopata.RegistredUser

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.RegistredUsers.Create(input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}
