---
title: Spacer
page_title: Spacer
description: "Learn how to use the spacer command type when working with the Telerik UI ToolBar HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/toolbar/spacer
slug: spacer_toolbar_aspnetcore
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

* [Server-Side API](/api/toolbar)
