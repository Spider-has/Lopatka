package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spider-has/lopata-docker"
)

func (h *Handler) createMonument(c *gin.Context) {
	var input lopata.Monuments

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Monument.Create(input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type getAllMonumentListsResponse struct {
	Data []lopata.MonumentPreview `json:"data"`
}

func (h *Handler) getAllMonuments(c *gin.Context) {
	monument, err := h.services.Monument.GetAll()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllMonumentListsResponse{
		Data: monument,
	})
}

func (h *Handler) getMonumentById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid id Param")
		return
	}

	monument, err := h.services.Monument.GetById(id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, monument)
}

func (h *Handler) updateMonument(c *gin.Context) {
	MonumentId, err := strconv.Atoi(c.Param("id"))


	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid id Param")
		return
	}

	var input lopata.Monuments

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err = h.services.Monument.UpdateById(input, MonumentId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK,statusResponse{
		Status: "ok",
	})
}


func (h *Handler) deleteMonument(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid id Param")
		return
	}

	err = h.services.Monument.DeleteById(id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{
		Status: "ok",
	})
}
