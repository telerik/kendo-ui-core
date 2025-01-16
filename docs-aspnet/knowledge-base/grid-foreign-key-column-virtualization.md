---
title: Implementing Virtualization for the Foreign Key Column Editor in the Grid
description: An example on how to virtualize the foreign key column editor in the Telerik {{ site.product_short }} Data Grid.
type: how-to
page_title: Virtualizing the Foreign Key Column Editor
slug: grid-foreign-key-column-virtualization
tags: grid, foreign, editor, key, virtualization, combo, virtual
ticketid: 1418905, 1406973
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
 <tr>
  <td>Created with Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

I need to implement the virtualization for the Foreign Key column used in the {{ site.product }} Grid.

As the list is big (around 10000 records), it takes time to bind. So planning to implement the drop-down list virtualization for the list. How can I virtualize the Foreign Key column list that is already serialized in the `ViewData`?

## Solution

By passing the `ViewData["departments"]` collection in the Foreign Key column, you already have the data serialized on the client. The built-in editor template that comes from our extensions uses this collection to render a DropDownList.

The virtual ComboBox and DropDownList usually have server operations, however this will not be necessary because you already have the data on the client. The only thing missing is a `ValueMapper()`:

```
    // GridForeignKey.cshtml
    @model object
 
    <script>
        function valueMapper(options) {
            var values = convertValues(options.value);
            var selectList =  @(Html.Raw(Json.Encode((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName    ("") + "_Data"])));
            var indices = [];
    
            if (values && values.length > 0) {
                for (var j = 0; j < selectList.length; j++) {
                    var selectListItem = selectList[j];
                    if (values.indexOf(kendo.parseInt(selectListItem.Value)) > -1) {
                        indices.push(j);
                    }
                }
            }

            options.success(indices);
        }
    
        function convertValues(value) {
            var data = [];
    
            value = $.isArray(value) ? value : [value];
    
            for (var idx = 0; idx < value.length; idx++) {
                data.push(value[idx]);
            }
    
            return data;
        }
    </script>
	@(Html.Kendo().ComboBoxFor(m => m)
        .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("") + "_Data"])
        .Virtual(v => v.ValueMapper("valueMapper"))
    )
```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
