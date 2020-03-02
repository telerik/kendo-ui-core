---
title: Forms
page_title: Forms
description: "Use forms when working with a Telerik UI TabStrip for ASP.NET MVC."
previous_url: /helpers/navigation/tabstrip/forms
slug: forms_tabstrip_aspnetmvc
position: 4
---

# Forms

The TabStrip enables you to use forms.

To include `Html.BeginForm()` or `Ajax.BeginForm()` in a TabStrip `.Content()`, use the `.Render()` method of the TabStrip. Otherwise, the form will be rendered outside the TabStrip and the data will not be submitted correctly. The following implementation is not required if the form is placed inside a partial view which is loaded with Ajax through `.LoadContentFrom()`, or if a plain HTML `<form>` tag is used.

    @{Html.Kendo().TabStrip()
        .Name("TabStrip1")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Tab 1")
                .Content(@<text>
                    @using (Ajax.BeginForm("...", "..."))
                    {
                        ...
                    }
                </text>);
        }).Render();
    }

## See Also

* [Basic Usage of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TabStripBuilder)
* [TabStrip Server-Side API](/api/tabstrip)
