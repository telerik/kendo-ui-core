---
title: Group
page_title: Group
description: "Discover the Telerik UI ToggleButton component for {{ site.framework }} and learn how to group several ToggleButtons together."
components: ["togglebutton"]
slug: htmlhelpers_togglebutton_aspnetcore_group
position: 3
---

# Group

The {{ site.framework }} ToggleButton component exposes the ability to group several instances into one distinguished group. This gives you the advantage of molding several ToggleButton instances and accessing them altogether via the `data-group` attribute, which will be rendered for the elements.

The following example illustrates how to enable the group functionality

```HtmlHelper
     @(Html.Kendo().ToggleButton()
         .Name("volumeUpBtn")
         .Group("volumes")
         .Selected(true)
         .Content("Increase volume")
     )

     @(Html.Kendo().ToggleButton()
         .Name("volumeMuteBtn")
         .Group("volumes")
         .Content("Mute volume")
     )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

     <div>
        <kendo-togglebutton name="volumeUpBtn"
                            group="volumes"
                            selected="true">
            Increase Volume
        </kendo-togglebutton>
    </div>

    <div>
        <kendo-togglebutton name="volumeMuteBtn"
                            group="volumes">
            Increase Volume
        </kendo-togglebutton>
    </div>
```
{% endif %}

## See Also

* [ToggleButton API HtmlHelper (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/api)
* [Server-Side API of the ToggleButton HtmlHelper for {{ site.framework }}](/api/togglebutton)
* [JavaScript API Reference of the ToggleButton HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)
