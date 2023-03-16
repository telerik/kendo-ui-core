---
title: Change Theme On The Client
page_title: Change Theme On The Client
description: "How to Change The {{ site.product }} Application Theme On The Client"
slug: howto_changethemeontheclient
previous_url: /styles-and-layout/client-side-theme-change
tags: change, theme, client, dropdown
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I allow the user to change the theme in my {{ site.product }} application?

## Solution

The Step by Step guide below demonstrates how to allow the user to change the theme of the application. The approach demonstrated uses cookies to store the theme selected by the user.

### Adding a DropDownList for theme selection

Add a {{ site.product_short }} DropDownList to the _Layout.cshtml file for theme selection.
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

### Sending information on the selected theme to the server

Upon selection of a theme, pass the selected theme name to an action method responsible for setting the theme.

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

Append the name of the selected theme to a cookie.
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

### Loading the selected theme

Set the theme in the _Layout.cshtml file, by following the requirements discussed in the [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) article. In the current example, the selected theme name is retrieved from the cookie and the CDN url for theme is generated. An alternative approach, if stylesheets are stored within the application, would be to generate the url to the stylesheet for the selected theme.

```razor
    @{
        var specialThemes = new string[] { "nova", "bootstrap", "fiori", "material", "materialblack", "office365" };
        var sassThemes = new string[] { "default-main", "bootstrap-main", "material-main" };
        var commonThemeName = "common";
        var mainHref = "https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/";
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

* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Sass ThemeBuilder]({% slug sass_theme_builder %})
* [Cards]({% slug cards_aspnetmvc6_aspnetmvc %})
