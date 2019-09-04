---
title: Spacer
page_title: Spacer | Telerik UI ToolBar HtmlHelper for ASP.NET MVC
description: "Learn how to use the spacer command type when working with the Telerik UI ToolBar HtmlHelper for ASP.NET MVC."
slug: spacer_toolbarhelper_aspnetmvc
position: 2
---

# Spacer

The `Spacer` command type moves the tools that are declared after it to the right side of the ToolBar.

```
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items => {
            items.Add().Type(CommandType.Button).Text("Button 1").Id("button1");
            items.Add().Type(CommandType.Spacer);
            items.Add().Type(CommandType.Button).Text("Button 2").Id("button2");
        })
    )
```

You can use multiple spacers to create an equal amount of space between several tools.

```
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items => {
            items.Add().Type(CommandType.Button).Text("Button 1").Id("button1");
            items.Add().Type(CommandType.Spacer);
            items.Add().Type(CommandType.Button).Text("Button 2").Id("button2");
            items.Add().Type(CommandType.Spacer);
            items.Add().Type(CommandType.Button).Text("Button 3").Id("button3");
        })
    )
```

## See Also

* [Basic Usage of the ToolBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/toolbar)
* [ToolBarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ToolBarBuilder)
* [ToolBar Server-Side API](/api/toolbar)
