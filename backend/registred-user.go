package lopata

type RegistredUser struct {
	Id        int    `json:"id" db:"id"`
	UserName  string `json:"UserName" db:"user_name"`
	UserEmail string `json:"UserEmail" db:"user_email"`
}
