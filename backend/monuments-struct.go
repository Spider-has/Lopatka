package lopata

type MonumentPreview struct {
	Id                 int    `json:"id" db:"id"`
	Header             string `json:"Header" db:"header" binding:"required"`
	Description        string `json:"Description" db:"description" binding:"required"`
	Date               string `json:"Date" db:"creation_date"`
	AuthorName         string `json:"AuthorName" db:"author_name"`
	FirstScreenImgName string `json:"FirstScreenImageName" db:"main_image" binding:"required"`
	MonumentType       string `json:"Type" db:"monument_type" binding:"required"`
	CultureType        string `json:"Culture" db:"culture_type" binding:"required"`
	Era                string `json:"Era" db:"era" binding:"required"`
	District           string `json:"District" db:"district" binding:"required"`
	Coordinates        string `json:"Coordinates" db:"coords" binding:"required"`
}

type Monuments struct {
	Id                   int     `json:"id" db:"id"`
	Header               string  `json:"Header" db:"header" binding:"required"`
	Description          string  `json:"Description" db:"description" binding:"required"`
	Date                 string  `json:"Date" db:"creation_date"`
	AuthorName           string  `json:"AuthorName" db:"author_name"`
	FirstScreenImgName   string  `json:"FirstScreenImageName" binding:"required" db:"main_image"`
	FirstScreenImgHref   string  `json:"FirstScreenImageHref" binding:"required"`
	MonumentType         string  `json:"Type" db:"monument_type" binding:"required"`
	CultureType          string  `json:"Culture" db:"culture_type" binding:"required"`
	Era                  string  `json:"Era" db:"era" binding:"required"`
	District             string  `json:"District" db:"district" binding:"required"`
	Coordinates          string  `json:"Coordinates" db:"coords" binding:"required"`
	MainContent          string  `json:"MainContent" db:"content" binding:"required"`
	MainContentImageData []Image `json:"MainContentImageData"`
}


type MapData struct {
	Id                 int    `json:"id" db:"id"`
	Header             string `json:"Header" db:"header" binding:"required"`
	Coordinates        string `json:"Coordinates" db:"coords" binding:"required"`
}