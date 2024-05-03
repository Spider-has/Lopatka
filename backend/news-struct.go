package lopata

type Image struct {
	Href string `json:"href" binding:"required"`
	Name string `json:"name" binding:"required"`
}

type NewPreview struct {
	Id          int    `json:"id" db:"id"`
	Header      string `json:"Header" db:"header" binding:"required"`
	Description string `json:"Description" db:"description" binding:"required"`
	Date string `json:"Date" db:"creation_date"`
	AuthorName    string    `json:"AuthorName" db:"author_name"`
	FirstScreenImgName string `json:"FirstScreenImageName" db:"main_image" binding:"required"`
	Theme      string `json:"Theme" db:"theme" binding:"required"`
}

type News struct {
	Id          int    `json:"id" db:"id"`
	Header      string `json:"Header" db:"header" binding:"required"`
	Description string `json:"Description" db:"description" binding:"required"`
	Date string `json:"Date" db:"creation_date"`
	AuthorName    string    `json:"AuthorName" db:"author_name"`
	FirstScreenImgName string `json:"FirstScreenImageName" binding:"required" db:"main_image"`
	FirstScreenImgHref string `json:"FirstScreenImageHref" binding:"required"`
	Theme      string `json:"Theme" db:"theme" binding:"required"`
	MainContent string `json:"MainContent" db:"content" binding:"required"`
	MainContentImageData []Image `json:"MainContentImageData"`
}

type Monuments struct {
	Id          int    `json:"-"`
	AuthorId    int    `json:"authorId"`
	Header      string `json:"header"`
	MainContent string `json:"maincontent"`
	Description string `json:"description"`
	Coords      string `json:"coords"`
}
