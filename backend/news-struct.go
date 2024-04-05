package lopata

type News struct {
	Id          int    `json:"-"`
	AuthorId    int    `json:"authorId"`
	Header      string `json:"header"`
	MainContent string `json:"maincontent"`
	Description string `json:"description"`
}

type Monuments struct {
	Id          int    `json:"-"`
	AuthorId    int    `json:"authorId"`
	Header      string `json:"header"`
	MainContent string `json:"maincontent"`
	Description string `json:"description"`
	Coords      string `json:"coords"`
}
