---
title: Templates
page_title: jQuery BottomNavigation Documentation | BottomNavigation Templates
description: "Learn about how to use Kendo UI templates with the jQuery BottomNavigation"
slug: templates_bottomnavigation_widget
position: 4
---

# Templates

The BottomNavigation provides full control over the rendering of the items by using [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

For a complete example, refer to the [demo on customizing the BottomNavigation templates](https://demos.telerik.com/kendo-ui/bottomnavigation/templates).

## Item Templates

The [`template`](/api/javascript/ui/bottomnavigation/configuration/template) configuration manages the rendering of the BottomNavigation items.

```dojo
    <nav id="fab"></nav>

    <script id="bottomnav-template" type="text/x-kendo-template">
        <span class="k-icon k-i-#= icon #"> </span>
        <span> #= text # </span>
        <span id="badge-#=text#"></span>
    </script>
    <script>
        $("#bottomNavigation").kendoBottomNavigation({
            template: kendo.template($("#bottomnav-template").html()),
            items: [
                { data: { view: "inbox" }, icon: "email", text: "Inbox", selected: true },
                { data: { view: "calendar" }, icon: "calendar", text: "Calendar" },
                { data: { view: "profile" }, icon: "user", text: "Profile" }
            ],            
        });
    </script>
```

## See Also

* [Templates Demo of the BottomNavigation](https://demos.telerik.com/kendo-ui/bottomnavigation/templates)
* [JavaScript API Reference of the BottomNavigation](/api/javascript/ui/bottomnavigation)
