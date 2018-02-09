package main

import (
	"context"
	"net/http"
	"github.com/labstack/echo"
	"github.com/olivere/elastic"
	"github.com/labstack/gommon/log"
	"io"
	"html/template"
)

var elasticClient *elastic.Client

type TemplateRenderer struct {
	templates *template.Template
}

func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	if viewContext, isMap := data.(map[string]interface{}); isMap {
		viewContext["reverse"] = c.Echo().Reverse
	}
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {

	var err error
	elasticClient, err = elastic.NewClient(
		elastic.SetURL("http://localhost:9200"),
		elastic.SetBasicAuth("elastic", "changeme"))

	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()
	e.GET("/:tag", index)
	e.GET("/", index)
	e.Static("/static", "assets")
	e.HideBanner = true
	e.Renderer = &TemplateRenderer{
		templates: template.Must(template.ParseGlob("public/views/index.html")),
	}

	e.Logger.Fatal(e.Start(":1323"))
}

type Command struct {

}

func index(c echo.Context) error {

	tag := c.Param("tag")
	if len(tag) == 0 {
		tag = "Martin"
	}

	ctx := context.Background()
	searchResults, err := elasticClient.Search("commands").Do(ctx)
	if err != nil {
		log.Fatal(err)
	}
	_ = searchResults

	return c.Render(http.StatusOK, "index.html", map[string]interface{}{
		"name": tag,
	})

}

