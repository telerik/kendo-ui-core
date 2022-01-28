---
title: Visual Basic Syntax
page_title: Visual Basic Syntax
description: "Get started with Telerik UI for ASP.NET MVC and apply the proper Visual Basic syntax when using lambda expressions and anonymous types inside the helper declarations."
slug: visualbasic_aspnetmvc
previous_url: /vb, /getting-started/vb
position: 4
permalink: /getting-started/helper-basics/vb
---

# Visual Basic Syntax

When you use [lambda expressions](http://msdn.microsoft.com/en-us/library/bb531253.aspx) and [anonymous types](http://msdn.microsoft.com/en-us/library/bb384767.aspx) inside the helper declarations, you have to apply the correct Visual Basic (VB) syntax.

The following example demonstrates how to use the VB syntax in the Editor.

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

The following example demonstrates how to use the VB syntax in the TabStrip.

    @Code

        Dim tab As Kendo.Mvc.UI.Fluent.TabStripBuilder = Html.Kendo().TabStrip().Name("TabStrip1")

        tab.Items(Function(f) f.Add().Text("tab 1").Content(Sub()
                                @<text>HTML content</text>
                                                            End Sub))
        tab.Items(Function(f) f.Add().Text("tab 2").Selected(True).Content("<div>HTML content</div>"))
        tab.Render()

    End Code

    @Code
        Html.Kendo().TabStrip() _
            .Name("TabStrip2") _
            .Items(Function(tabstrip) tabstrip.Add().Text("tab text") _
                .Selected(True) _
                .Content(Sub()@<text>html content</text>
                        End Sub)) _
            .Render()
    End Code

    @(Html.Kendo().TabStrip() _
        .Name("TabStrip3") _
        .Items(Function(tabstrip) tabstrip.Add().Text("tab text") _
        .Selected(True) _
        .Content("string content")))

The following example demonstrates how to use the VB syntax in the Grid.

    @Code
        Html.Kendo().Grid(Of TelerikMvcAppVB.Person)() _
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
                d.Ajax() _
                .Read(Function(read) read.Action("Person_Read", "GridList")) _
                    .Model(Sub(m)
                        m.Id(Function(i) i.PersonID)
                        m.Field(Function(p) p.PersonBirthDate).Editable(False)
                        End Sub)
                End Function) _
            .Render()
    End Code

The following example demonstrates alternative ToolBar configurations.

    ...
    .ToolBar(Function(t)
                     t.Template("template as a string")
             End Function) _
    ...

    ...
    .ToolBar(Function(t)
                     t.Template(Sub()
                                    @<text>server template</text>
                                End Sub)
             End Function) _
    ...

The following example demonstrates how to use the VB syntax with the Cotroller.

    Imports Kendo.Mvc.Extensions
    Imports Kendo.Mvc.UI

    Public Class HomeController
        Inherits System.Web.Mvc.Controller

        Function Person_Read(<DataSourceRequest> request As DataSourceRequest) As ActionResult
            Dim grades = New List(Of Person)()
            grades.Add(New Person() With {
             .PersonID = 1,
             .PersonName = "Person1",
             .PersonBirthDate = New DateTime(Now.Year, Now.Month, Now.Day, 10, 30, 0, 0)
        })
            grades.Add(New Person() With {
             .PersonID = 2,
             .PersonName = "Person2",
             .PersonBirthDate = New DateTime(Now.Year, Now.Month, Now.Day, 11, 15, 0, 0)
        })
            Dim res As IQueryable(Of Person) = grades.AsQueryable()
            Dim res1 As DataSourceResult = res.ToDataSourceResult(request)
            Return Json(res1)
        End Function

    End Class

The following example demonstrates how to use the VB syntax with the Model.

    Public Class Person
        Public Property PersonID As Integer
        Public Property PersonName As String
        Public Property PersonBirthDate As DateTime
    End Class

The following example demonstrates how to use the VB syntax with editor templates.

    @ModelType Nullable(Of Integer)

    @Code
        Html.Kendo().NumericTextBoxFor(Function(m) m) _
          .HtmlAttributes(New With {.style = "width:100%"}) _
        .Render()
    End Code

## See Also

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
