package main

import (
	"net/http"
	"log"
	"net/url"
	"html/template"
	"io/ioutil"
)

type Page struct {
	InitialCommands template.JS
}

func indexHandler(w http.ResponseWriter, r *http.Request) {

	queryString := r.URL.Query()["search"][0]

	searchQuery := url.Values{}
	searchQuery.Add("search", queryString)

	response, err := http.Get("http://qcmd.koptik.eu/api/search?" + searchQuery.Encode())

	if err != nil {
		log.Fatal(err)
	}

	defer response.Body.Close()
	bodyBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	t, _ := template.ParseFiles("index.html")
	data := &Page{
		InitialCommands: template.JS(bodyBytes),
	}
	_ = t.Execute(w, data)
}

func main() {
	http.HandleFunc("/search", indexHandler)
	log.Printf("Starting http server on port 8888")
	log.Fatal(http.ListenAndServe(":8888", nil))
}



