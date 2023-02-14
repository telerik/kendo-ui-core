---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Switch for {{ site.framework }}."
previous_url: /helpers/editors/switch/overview
slug: overview_switchhelper_aspnetcore
position: 1
---

# {{ site.framework }} Switch Overview

{% if site.core %}
The Telerik UI Switch TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Switch widget.
{% else %}
The Telerik UI Switch HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Switch widget.
{% endif %}

The Switch displays two exclusive choices. With the new Switch variables introduced in the Kendo UI for jQuery R1 2019 release, the default styling of the Switch component for each of the [Sass-based Kendo UI for jQuery themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on implementing a [custom layout for the Switch](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

* [Demo page for the Switch](https://demos.telerik.com/{{ site.platform }}/switch/index)
{% if site.core %}
* [Demo page for the Switch](https://demos.telerik.com/aspnet-core/switch/tag-helper)
{% endif %}

## Initializing the Switch

The following example demonstrates how to define the Switch.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch") // The name of the Switch is mandatory. It specifies the "id" attribute of the widget.
        .Checked(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch"
            checked="true"></kendo-switch>
```
{% endif %}

## Basic Configuration

The configuration options of the Switch are passed as attributes.

```tab-HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Checked(true)
        .Enabled(true))
```
```tab-TagHelper
    <kendo-switch name="switch"
            checked="true"
            enabled="true"></kendo-switch>
```




## Functionality and Features

The Switch provides [accessibility support]({% slug accessibility_aspnetcore_switch %}) through its keyboard navigation.

## Events

You can subscribe to all Switch events. For a complete example on basic Switch events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/{{ site.platform }}/switch/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e
            .Change("change")
        )
    )
    <script>
        function change(e) {
            //Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
<kendo-switch name="switch" on-change="change"></kendo-switch>
<script>
    function change(e) {
        //Handle the change event.
    }
</script>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e
            .Change(@<text>
              function(e) {
                  //Handle the change event inline.
              }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Switch instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Switch client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch#methods) to control its behavior.

```
    // Place the following after your Telerik UI Switch for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the Switch is used to get its client-side instance.
            var switch = $("#switch").data("kendoSwitch");
        });
    </script>
```

## See Also

* [Basic Usage by the Switch HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch)
{% if site.core %}
* [Basic Usage of the Switch TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/switch/tag-helper)
{% endif %}
* [Using the API of the Switch HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/api)
* [Server-Side API](/api/switch)
