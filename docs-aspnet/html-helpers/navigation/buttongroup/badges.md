---
title: Badges
page_title: Badges
description: "Learn how to configure the badges of the Telerik UI ButtonGroup component for {{ site.framework }}."
slug: badges_buttongroup_aspnetcore
position: 8
---

# Badges

The Telerik UI for {{ site.framework }} ButtonGroup provides options for adding badges to its Buttons.

To add or update a badge, use the `Badge()` configuration method.

```HtmlHelper
    @(Html.Kendo().ButtonGroup()
       .Name("player")
       .Items(t =>
       {
           t.Add().Text("One").Badge("1");
       })
    )
```
{% if site.core %}
```TagHelper
    <kendo-buttongroup name="player">
        <buttongroup-items>
            <item text="One">
                <badge text="1" />
            </item>
        </buttongroup-items>
    </kendo-buttongroup>
```
{% endif %}

## See Also

* [Adding Badges to the ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/badges)
* [Server-Side API of the ButtonGroup for {{ site.framework }}](/api/badge)