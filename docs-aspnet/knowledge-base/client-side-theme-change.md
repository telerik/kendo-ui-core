---
title: Changing the Theme On The Client
page_title: Change Theme On The Client
description: How to enable the users to change the {{ site.product }} application theme on the client?
slug: howto_changethemeontheclient
previous_url: /styles-and-layout/client-side-theme-change
tags: change, theme, client, dropdown
res_type: kb
components: ["general"]
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

The step-by-step guide below demonstrates how to allow the user to change the theme of the application. The demonstrated approach uses cookies to store the theme selected by the user.

### 1. Adding a DropDownList for Theme Selection

Add a {{ site.product_short }} DropDownList to the `_Layout.cshtml` file for theme selection.

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

### 2. Sending Information about the Theme to the Server

1. Upon selection of a theme, pass the selected theme name to an action method responsible for setting the theme.

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

1. Append the name of the selected theme to a cookie.

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

### 3. Loading the Selected Theme

Set the theme in the `_Layout.cshtml` file by following the requirements discussed in the [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) article. In the current example, the selected theme name is retrieved from the cookie and the CDN URL for theme is generated. 

If you store the stylesheets within the application, an alternative approach is to generate the URL to the stylesheet for the selected theme.

```razor
    @{
        var mainHref = "https://kendo.cdn.telerik.com/themes/6.3.0/";
        var selectedTheme = "classic/classic-main";

        if (Request.Cookies["theme"] != null)
        {
            selectedTheme = Request.Cookies["theme"].Value;
        }

        if (selectedTheme == "custom")
        {
            <link rel="stylesheet" href="~/css/styles/kendo.custom.css" />
        }

        else
        {
            var themeHref = mainHref + selectedTheme + ".css";
            <link href=@themeHref rel="stylesheet" type="text/css" />
        }
    }
```

## More {{ site.framework }} DropDownList Resources

* [{{ site.framework }} DropDownList Documentation]({%slug htmlhelpers_dropdownlist_aspnetcore%})

* [{{ site.framework }} DropDownList Demos](https://demos.telerik.com/{{ site.platform }}/dropdownlist)

{% if site.core %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DropDownList Product Page](https://www.telerik.com/aspnet-mvc/dropdownlist)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
