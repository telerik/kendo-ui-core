---
title: Badge Button
page_title: Badge Button
description: "Include a badge and enhance the meaning of the text content of the Telerik UI Button TagHelper for {{ site.framework }}."
slug: taghelpers_button_badges
position: 4
---

# Badge Button

The Button can accommodate a [Badge](https://docs.telerik.com/{{ site.platform }}/tag-helpers/layout/badge/overview) that enhances the textual content and adds more context.

The Button TagHelper provides the `<badge>` tag for configuring the Button's Badge. You can customize the appearance of the Badge through its attributes.


```

<kendo-button name="buttonWithBadge">
    <badge text="+5"
           cutout-border="true"
           visible="true"
           fill="@BadgeFill.Solid"
           shape="@BadgeShape.Rectangle"
           size="@BadgeSize.Large"
           theme-color="@BadgeColor.Success"
           position="@BadgePosition.Outside"
           align="@BadgeAlign.TopEnd" />
    New registrations
</kendo-button>

```


 The `icon` attribute displays the appropriate [Kendo UI for jQuery font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) icon. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.


```
<kendo-button name="buttonWithBadge">
    <badge icon="save"
           fill="@BadgeFill.Solid"
           shape="@BadgeShape.Circle"
           size="@BadgeSize.Medium"
           theme-color="@BadgeColor.Success"
           position="@BadgePosition.Edge"
           align="@BadgeAlign.TopStart" />
    Save
</kendo-button>

```

## See Also

* [Adding Badges to the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/badges)
* [Server-Side API](/api/button)
