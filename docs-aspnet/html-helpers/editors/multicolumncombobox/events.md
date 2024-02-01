---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
slug: events_multicolumncombobox_aspnetcore
position: 10
---

# Events

You can subscribe to the `Change`, `Select`, `Open`, `Close`, `DataBound`, and `Filtering` [MultiColumnComboBox events](/api/kendo.mvc.ui.fluent/multicolumncomboboxeventbuilder) and further customize the functionality of the component.

For a complete example on basic MultiColumnComboBox events, refer to the [demo on using the events of the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/events).

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
      .Name("multicolumncombobox")
      .Events(e => e
            .Change("onChange")
            .Select("onSelect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker"
        on-change="onChange"
        on-select="onSelect"
        on-open="onOpen"
        on-close="onClose"
        on-data-bound="onDataBound"
        on-filtering="onFiltering"/>
```
{% endif %}
```JavaScript

    function onOpen() {
        // Handle the open event.
    }

    function onClose() {
        // Handle the close event.
    }

    function onChange() {
        // Handle the change event.
    }

    function onDataBound() {
        // Handle the dataBound event.
    }

    function onSelect(e) {
        // Handle the select event.
    }

    function onFiltering() {
        // Handle the filtering event.
    }

```

### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Events(e => e
            .Open(@<text>
                function() {
                    // Handle the `open` event inline.
                }
            </text>)
            .Close(@<text>
                function() {
                    // Handle the `close` event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the `change` event inline.
                }
            </text>)
            .DataBound(@<text>
                function() {
                    // Handle the `dataBound` event inline.
                }
            </text>)
            .Select(@<text>
                function() {
                    // Handle the `select` event inline.
                }
            </text>)
            .Filtering(@<text>
                function() {
                    // Handle the `filtering` event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox name="multicolumncombobox"
        on-change=='function(e)
        {
            // Handle the `change` event inline.
        }'
        on-select='function(e)
        {
            // Handle the `select` event inline.
        }'
        on-open='function(e)
        {
            // Handle the `open` event inline.
        }'
        on-close='function(e)
        {
            // Handle the `close` event inline.
        }'
        on-data-bound='function(e)
        {
            // Handle the `dataBound` event inline.
        }'
        on-filtering='function(e)
        {
            / Handle the filtering event inline.
        }'/>
```
{% endif %}

## Next Steps

* [Using the MultiColumnComboBox Events (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/events)

## See Also

* [Using the API of the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/api)
* [Server-Side API of the MultiColumnComboBox](/api/multicolumncombobox)
* [Client-Side API of the MultiColumnComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox)
