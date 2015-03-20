---
title: VB Syntax
page_title: Visual Basic syntax in Kendo UI MVC wrapper declarations
description: Example of correct VB Syntax which is applicable to anonymous types and lambda expressions in Kendo UI MVC wrapper declarations.
position: 7
---

# VB Syntax

The following examples show the correct Visual Basic (VB) syntax when using [lamba expressions](http://msdn.microsoft.com/en-us/library/bb531253.aspx) and
[anonymous types](http://msdn.microsoft.com/en-us/library/bb384767.aspx) inside Kendo UI MVC wrapper declarations.

## Editor

    @Code

        Html.Kendo().Editor() _
        .Name("Editor") _
        .HtmlAttributes(New With {.style = "width: 740px;height:440px"}) _
        .Value(Sub()@<text><p>Hellow World!</p></text> End Sub) _
        .Tools(Sub(t)
                       t.Clear()
                       t.FontName(Sub(items)
                                          items.Add("Garamond", "garamond")
                                          items.Add("Verdana", "verdana")
                                  End Sub)
                       t.CustomButton(Sub(cb)
                                              cb.Name("custom")
                                              cb.ToolTip("horizontal rule")
                                              cb.Exec(Function()
                                                              Return "function(e) { alert('exec'); }"
                                                      End Function)
                                      End Sub)
                       t.CustomTemplate(Sub(ct)
                                                ct.Template("<span>custom template</span>")
                                        End Sub)
               End Sub) _
        .Render()

    End Code

## Grid

### View

    @Code
        Html.Kendo().Grid(Of KendoUIMvcVB.Person)() _
            .Name("Grid") _
            .Columns(Sub(c)
                            c.Bound(Function(p) p.PersonID)
                            c.Bound(Function(p) p.PersonName)
                            c.Bound(Function(p) p.PersonBirthDate)
                            c.Template(Sub()
                                            @<text>server template</text>
                                       End Sub).Title("Template column").ClientTemplate("client template")
                     End Sub) _
        .Pageable() _
        .Sortable() _
        .Filterable() _
        .DataSource(Function(d)
                            d.Ajax().Read(Function(read) read.Action("Person_Read", "Home")).Model(Sub(m)
                                                                                                         m.Id(Function(i) i.PersonID)
                                                                                                   End Sub)
                    End Function) _
        .Render()
    End Code

### Controller

    Imports Kendo.Mvc.Extensions
    Imports Kendo.Mvc.UI

    Public Class HomeController
        Inherits System.Web.Mvc.Controller

        Function Person_Read(<DataSourceRequest>request As DataSourceRequest) As ActionResult
            Dim result As List(Of Person) = New List(Of Person)
            Return Json(result.ToDataSourceResult(request))
        End Function

    End Class

## Editor Template

    @ModelType Nullable(Of Integer)

    @Code
        Html.Kendo().NumericTextBoxFor(Function(m) m) _
          .HtmlAttributes(New With {.style = "width:100%"}) _
        .Render()
    End Code
