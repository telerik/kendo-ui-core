---
title: Missing Font Icons
description: "Learn more about the new icon rendering and how to revert back to the old font icon rendering in a {{ site.product }} application."
page_title: Missing Font Icons
slug: missing-font-icons
tags: font, icons, backward, compatibility, upgrade, troubleshoot, application, missing
res_type: kb
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2023.1.314</td>
 </tr>
</table>


## Description

In some components, we often use commands with `IconClass()` to display icon buttons for the majority of the components. However, after updating we noticed that the font icon classes are no longer applied.

## Solution

As of the `R3 2023` release, the Telerik UI toolset supports rendering of SVG icons instead of the traditional Font icons.

Although the SVG icons are used as the predominant font toolset for the suite, this does not stop you from reverting to the Font icons:

{% if site.core %}
* Configure the added server-side Kendo service in the `Program.cs` class:
    ```C#
        builder.Services.AddKendo(options =>
        {
            options.IconType = Kendo.Mvc.IconType.Font;
        });
    ```

{% else %}
* Configure the added server-side Kendo service in the `Global.asax` class:
    ```
       KendoMvc.Setup(x=>
       {
           x.IconType = IconType.Font;
       });
    ```
{% endif %}

* Invoke the `Html.Kendo().DefaultSettings()` method within the `_Layout.cshtml` of the application in order for the components to utilize font-icon rendering:

    ```Razor
        @Html.Kendo().DefaultSettings()
    ```

## See Also

* [Upgrade Troubleshooting]({% slug upgrade_aspnetcore_troubleshooting %})
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)