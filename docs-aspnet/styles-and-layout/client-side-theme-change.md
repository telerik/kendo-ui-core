---
title: Change Theme On The Client 
page_title: Change Theme On The Client
description: "How to Change The {{ site.product }} Application Theme On The Client"
slug: howto_changethemeontheclient
position: 3
---

# Change Theme On The Client 

The Step by Step guide below demonstrates how to allow the user to change the theme of the application. The approach demonstrated uses cookies to store the theme selected by the user. For a runnable example, refer to the GitHub repo on how to [change the theme on the client]{% if site.core %}(https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/StylesAndLayout/ClientThemeChange.cshtml){% else %}(https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/styles-and-layout/ChangingThemesOnTheClient){% endif %}.

Тhe _Layout.cshtml file provides a Kendo DropDownList for theme selection.
```razor
    @(Html.Kendo().DropDownList()
        .Name("themeSelector")
        .DataTextField("Name")
        .DataValueField("ThemeId")
        .OptionLabel("Select Theme")
        .Height(300)
        .AutoWidth(true)
        .DataSource(source =>
            {
            source.Read(read =>
            {
                    read.Action("GetThemes", "Home");
                });
            }).Events(ev => ev.Change("themeSelection"))
        .HtmlAttributes(new { style = "float: right" })
    )
```

Upon selection of a theme, the selected theme value is passed to the controller action method.

```javascript
    function themeSelection(e) {
        var selectedTheme = e.sender.dataItem();
        $.post({
            url: "/Home/SetTheme",
            data: { selection: selectedTheme.ThemeId },
            success: function (data) {
                window.location = data.url;
            }
    });
```

Within the action method the selected theme value is appended to a cookie.
{% if site.core %}
```Controller
    [HttpPost]
    public IActionResult SetTheme(string selection)
    {
        CookieOptions cookie = new CookieOptions();
        cookie.Expires = DateTime.Now.AddMinutes(10);

        Response.Cookies.Append("theme", selection, cookie);
        var returnUrl = Request.Headers["Referer"].ToString();
        return Json(new { result = "Redirect", url = returnUrl });
    }
```
{% else %}
```Controller
    [HttpPost]
    public ActionResult SetTheme(string selection)
    {
        HttpCookie cookie = Request.Cookies.Get("theme");
        if(cookie == null)
        {
            cookie = new HttpCookie("theme", selection) { Expires = DateTime.Now.AddMinutes(10) };
        }
        else
        {
            cookie.Value = selection;
        }

        HttpContext.Response.AppendCookie(cookie);
        var returnUrl = Request.Headers["Referer"].ToString();
        return Json(new { result = "Redirect", url = returnUrl });
    }
```
{% endif %}

Setting the theme in the _Layout.cshtml file follows the requirements discussed in the [Including Client-Side Resources]{% if site.core %}({% slug copyclientresources_aspnetmvc6_aspnetmvc %}){% else %}({% slug copyclientresources_aspnetmvc %}){% endif %} article. The selected theme value is retrieved from the cookie and CDN urls for the selected theme are generated. An alternative approach, if stylesheets are stored within the application, would be to generate the url to the stylesheet for the selected theme.

```razor
    @{
        var specialThemes = new string[] { "nova", "bootstrap", "fiori", "material", "materialblack", "office365" };
        var sassThemes = new string[] { "default-v2", "bootstrap-v4", "material-v2" };
        var commonThemeName = "common";
        var mainHref = "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.";
        var isThemeSelected = Context.Request.Cookies.TryGetValue("theme", out string selectedTheme);

        if (!isThemeSelected)
        {
            selectedTheme = "default";
        }

        var themeHref = mainHref + selectedTheme + ".min.css";
        var commonThemeHref = mainHref + commonThemeName + ".min.css";
        if (specialThemes.Any(x => x == selectedTheme))
        {
            commonThemeName += "-" + selectedTheme.Replace("materialblack", "material");
        }

        if (sassThemes.Contains(selectedTheme) && selectedTheme == "custom")
        {
            <link rel="stylesheet" href="~/css/styles/kendo.custom.css" />
        }
        else if (sassThemes.Contains(selectedTheme))
        {
            <link href=@themeHref rel="stylesheet" type="text/css" />
        }
        else
        {
            <link href=@commonThemeHref rel="stylesheet" type="text/css" />
            <link href=@themeHref rel="stylesheet" type="text/css" />
        }
    }
```

## See Also

* [Including Client-Side Resources]{% if site.core %}({% slug copyclientresources_aspnetmvc6_aspnetmvc %}){% else %}({% slug copyclientresources_aspnetmvc %}){% endif %}
* [Sass ThemeBuilder]({% slug sass_theme_builder %})
* [Cards]({% slug cards_aspnetmvc6_aspnetmvc %})
