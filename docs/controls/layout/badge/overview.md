---
title: Overview
page_title: jQuery Badge Documentation | Dialog Overview | Kendo UI
description: "Get started with the jQuery Badge by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_badge_widget
position: 1
---

# Badge Overview

The Badge is an absolutely positioned element that is used to decorate avatars, navigation menus, or other components in the application when the visual notification is needed.

It also provides customizing its content through templates, setting different types and layouts.

* [Demo page for the Badge](http://demos.telerik.com/kendo-ui/badge/index)

## Initializing the Badge

To initialize the Badge, you can use virtually any `span` element. The following example demonstrates how to initialize the Badge.

```dojo
    <a class="k-button"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                appearance: "rectangle"
            });
        });
    </script>
```

## Basic Configuration

The badge also provides the choice to be inline or overlay and set its type. To make the badge overlay add the `k-badge-overlay` class to the parent parent element.

```dojo
    <a class="k-button k-badge-overlay"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                appearance: "rectangle",
                type:'warning'
            });
        });
    </script>
```

## Using templates

With the badge you can customize the content using templates.

```dojo
    <a class="k-button k-badge-overlay"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                appearance: "rectangle",
                type:"info",
                template: "#= +value > 10 ? '9+' : value #"
            });
        });
    </script>
```


## Referencing Existing Instances

You can access an existing Button instance by using the .data() jQuery method which gets executed by the jQuery object of the originating element.

```dojo
    <a class="k-button k-badge-overlay"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                appearance: "rectangle",
                type:"info"
            });
        });

        var badge = $('#badge').data('kendoBadge');
    </script>
```

## See Also

* [Basic Usage of the Badge (Demo)](https://demos.telerik.com/kendo-ui/badge/index)
* [JavaScript API Reference of the Badge](/api/javascript/ui/badge)