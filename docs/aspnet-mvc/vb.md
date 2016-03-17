---
title: Visual Basic Syntax
page_title: Visual Basic Syntax | Telerik UI for ASP.NET MVC
description: "Apply a proper Visual Basic syntax when using lamba expressions and anonymous types inside Kendo UI MVC wrapper declarations."
slug: visualbasic_aspnetmvc
position: 9
---

# Visual Basic Syntax

The examples below demonstrate the correct Visual Basic (VB) syntax when using [lamba expressions](http://msdn.microsoft.com/en-us/library/bb531253.aspx) and [anonymous types](http://msdn.microsoft.com/en-us/library/bb384767.aspx) inside Kendo UI MVC wrapper declarations.

## Editor

###### Example

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

## TabStrip

###### Example

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

## Grid

### View

###### Example

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
        .ToolBar(Function(t)
                    t.Create()
                    t.Custom().Name("myCustomCommand").Text("custom toolbar button")
                End Function) _
        .Filterable() _
        .DataSource(Function(d)
                            d.Ajax()
                                .Read(Function(read) read.Action("Person_Read", "Home")) _
                                .Update(Function(update) update.Action("Person_Update", "Home")) _
                                .Create(Function(create) create.Action("Person_Create", "Home")) _
                                .Destroy(Function(destroy) destroy.Action("Person_Destroy", "Home")) _
                                .Model(Sub(m)
                                            m.Id(Function(i) i.PersonID)
                                        End Sub)
                    End Function) _
        .Render()
    End Code

The example below demonstrates alternative ToolBar configurations.

###### Example

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

### Controller

###### Example

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

###### Example

    @ModelType Nullable(Of Integer)

    @Code
        Html.Kendo().NumericTextBoxFor(Function(m) m) _
          .HtmlAttributes(New With {.style = "width:100%"}) _
        .Render()
    End Code

## See Also

Other articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Visual Studio Integration]({% slug overview_visualstudio_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [ASP.NET MVC 3]({% slug aspnetmvc3_aspnetmvc %})
* [ASP.NET MVC 4]({% slug aspnetmvc4_aspnetmvc %})
* [ASP.NET MVC 5]({% slug aspnetmvc5_aspnetmvc %})
* [ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
