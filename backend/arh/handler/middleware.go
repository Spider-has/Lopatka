package handlers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	authorizationHeader = "Authorization"
	userCtx = "userId"
)

func (h *Handler) userIdentity(c *gin.Context){
	header := c.GetHeader(authorizationHeader)
	if header == "" {
		newErrorResponse(c, http.StatusUnauthorized, "empty auth header")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		newErrorResponse(c, http.StatusUnauthorized, "invalid auth header")
		return
	}

	userId, err := h.services.Authorization.ParseToken(headerParts[1])
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set(userCtx, userId)
}

//эта функция так же была бы нужна для связывания юзера и поста в бд, но опять же, дедлайн уже через 4 дня))

func getUserId(c *gin.Context) (int, error){
	id, ok := c.Get(userCtx)

	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return 0, errors.New("user id not found")
	}

	idInt, ok := id.(int)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return 0, errors.New("user id not found")
	}

	return idInt, nil
}

