---
title: Ajax Binding
page_title: Ajax Data Binding
description: "Learn how to asynchronously load the tab content of the {{ site.product }} TabStrip using Ajax binding."
slug: htmlhelpers_tabstrip_ajaxbinding
position: 4
---

# Ajax Data Binding

The TabStrip provides support for remote data binding by using AJAX to load tab content from remote URLs. 

When using remote data binding, the TabStrip can load content asynchronously when tabs are activated, providing optimal performance by loading content on-demand as users navigate through the tabs. The remote endpoints return HTML content that is loaded directly into the tab content area.

The following example shows how to configure the TabStrip for remote data binding with AJAX content loading.

```HtmlHelper
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .LoadContentFrom(Url.Action("Paris", "Home"))
            .Data("additionalData")
            .Type(HttpVerbs.Post);

        tabstrip.Add().Text("Sofia")
            .LoadContentFrom(Url.Action("Sofia", "Home"));
    })
)
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Paris"
            content-url="@Url.Action("Paris", "Home")"
            data="additionalData"
            type="POST">
        </tabstrip-item>
        <tabstrip-item text="Sofia"
            content-url="@Url.Action("Sofia", "Home")">
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}
```JavaScript
function additionalData(){
    return {
        myParam: "myValue"
    }
}
```
```C# Controller
public PartialViewResult Paris()
{
    var weatherData = GetWeatherData("Paris");
    return PartialView("_WeatherPartial", weatherData);
}

public PartialViewResult Sofia()
{
    var weatherData = GetWeatherData("Sofia");
    return PartialView("_WeatherPartial", weatherData);
}

private WeatherViewModel GetWeatherData(string city)
{
    return new WeatherViewModel
    {
        City = city,
        Temperature = city == "Paris" ? "15°C" : "22°C",
        Description = city == "Paris" ? "Rainy weather" : "Sunny weather"
    };
}
```
```Razor _WeatherPartial.cshtml
@model WeatherViewModel

<div class="weather-content">
    <h3>@Model.City</h3>
    <p>Temperature: @Model.Temperature</p>
    <p>@Model.Description</p>
</div>
```

## See Also

* [Loading Content with AJAX in the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/ajax)
* [Server-Side API of the TabStrip HtmlHelper](/api/tabstrip)
{% if site.core %}
* [Server-Side API of the TabStrip TagHelper](/api/taghelpers/tabstrip)
{% endif %}