package api

type Api struct {
	listenAddr string
}

func NewApi(listenAddr string) *Api {
	return &Api{

		listenAddr: listenAddr,
	}
}
