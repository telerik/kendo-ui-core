---
title: Troubleshooting
page_title: Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with {{ site.product }} DropDownList."
slug: troubleshoot_dropdownlist_aspnetcore
position: 20
---

# Troubleshooting

This article provides solutions to common issues that you might come across when leveraging the Telerik UI for {{ site.framework }} DropDownList.

## Items return as undefined when configuring the DropDownList for Remote Binding

By default, the {{ site.framework }} predominantly configures the JSON property naming convention for server responses to `camelCase`. Where the DropDownList relies on `PascalCase` formatted response instead.

The following example demonstrates the differences between the format of responses.

```JS PascalCase
[
    {
        "Value": "1",
        "Text": "Option1"
    },
    {
        "Value": "2",
        "Text": "Option2"
    }
]
```
```JS camelCase
[
    {
        "value": "1",
        "text": "Option1"
    },
    {
        "value": "2",
        "text": "Option2"
    }
]
```

### Solution

To handle Pascal-Cased formatted responses, alter the default JSON property naming convention by using the available [JSON Serialization Options](https://docs.telerik.com/aspnet-core/installation/json-serialization#json-serialization).


```C#
builder.Services
            .AddControllersWithViews()
            .AddJsonOptions(options => {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
```

## See Also

* [Basic Usage of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist)
* [Using the API of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/api)
* [Server-Side API](/api/grid)
