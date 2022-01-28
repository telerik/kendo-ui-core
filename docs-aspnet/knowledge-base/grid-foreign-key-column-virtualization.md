---
title: Virtualization for the ForeignKey Column Editor in the Grid
description: An example on how to virtualize the foreign key column editor in the Telerik {{ site.product_short }}.
type: how-to
page_title: Virtualize the Foreign Key Column Editor
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

I would like to implement the virtualization for the Foreign key column used in the kendogrid.

As the list is big (around 10000 records), it takes time to bind. So planning to implement the dropdownlist virtualization for the list. How can I virtualize the foreign key column list that is already serialized in the ViewData?

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
