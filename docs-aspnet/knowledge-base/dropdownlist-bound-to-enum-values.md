---
title: Populating a Form DropDownList with Enum Values
description: Learn how to  populate a DropDownList editor with Enum values and bind them to the model.
type: how-to
page_title: Binding DropDownList to Enum Values
slug: dropdownlist-bound-to-enum-values
position: 
tags: form, dropdownlist, enum, bind, populate
ticketid: 1601481
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2023.1.314</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>DropDownList for {{ site.framework }}</td>
        </tr>
    </tbody>
</table>


## Description

I want to populate a DropDownList editor of a Form with the Enum values and bind them to the model.

## Solution

The desired result can be achieved by:

- Using the [Html.GetEnumSelectList<TEnum>()](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.viewfeatures.htmlhelper.getenumselectlist?view=aspnetcore-7.0#microsoft-aspnetcore-mvc-viewfeatures-htmlhelper-getenumselectlist-1) to get the SelectList of  the available options and
- Using the BindTo() configuration of the DropDownList to bind to the returned SelectList.

Refer to [this REPL example](https://netcorerepl.telerik.com/mxORFgEN03Pjpclo16) for a runnable demo of the snippet below:

```
@using System.ComponentModel 
@functions{
    public enum Difficulty { Easy, Normal, Hard }

    public class MyModel
    {
        public string Name {get;set;}
        public Difficulty SelectedOption {get; set;}
    }
}

@{
    var modelData = new MyModel(){Name = "Player 1", SelectedOption = Difficulty.Normal};
}

@(Html.Kendo().Form<MyModel>()
        .Name("exampleForm")
        .FormData(modelData)
        .HtmlAttributes(new { action = "Items", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(true));
        })
        .Items(items =>
        {
            items.AddGroup()
                .Label("Choose Game settings")
                .Items(i =>
                {
                    i.Add()
                         .Field(f => f.Name)
                         .Label(l => l.Text("Player Name:"));

                    i.Add()
                        .Field(f => f.SelectedOption)
                        .Label(l => l.Text("Difficulty:"))
                        .Editor(e =>
                        {
                            e.DropDownList()
                                .DataTextField("Text")
                                .DataValueField("Value")
                                .Height(520)
                                .BindTo(Html.GetEnumSelectList<Difficulty>());  
                        });
                });
        })
    )

```

## See Also

- [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
- [Telerik REPL: Populating a Form DropDownList with Enum Values](https://netcorerepl.telerik.com/mxORFgEN03Pjpclo16)

## More {{ site.framework }} DropDownList Resources

- [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
- [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist/index)
{% if site.core %}
- [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)
- [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
- [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
- [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/dropdownlist)
- [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
- [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}
