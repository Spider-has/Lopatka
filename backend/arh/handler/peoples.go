package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spider-has/lopata-docker"
)

func (h *Handler) createPeopleArticle(c *gin.Context) {
	var input lopata.Peoples

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.People.Create(input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type getAllPeopleListsResponse struct {
	Data []lopata.Peoplereview `json:"data"`
}

func (h *Handler) getAllPeoplesArticles(c *gin.Context) {
	peoples, err := h.services.People.GetAll()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllPeopleListsResponse{
		Data: peoples,
	})
}

func (h *Handler) getPeopleArticleById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid id Param")
		return
	}

	people, err := h.services.People.GetById(id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, people)
}

func (h *Handler) updatePeopleArticle(c *gin.Context) {
	PeopleId, err := strconv.Atoi(c.Param("id"))


	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid id Param")
		return
	}

	var input lopata.Peoples

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err = h.services.People.UpdateById(input, PeopleId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK,statusResponse{
		Status: "ok",
	})
}

func (h *Handler) deletePeopleArticle(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid id Param")
		return
	}

	err = h.services.People.DeleteById(id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{
		Status: "ok",
	})
}
