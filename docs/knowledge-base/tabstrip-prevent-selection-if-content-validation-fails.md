---
title: Prevent tab selection if content validation fails
description: An example on how to prevent tab selection upon validation errors in the tab content for the TabStrip
type: how-to
page_title: Prevent tab selection if content validation fails | Kendo UI TabStrip
slug: tabstrip-prevent-selection-if-content-validation-fails
tags: kendo, kendo-ui, tabstrip, prevent, selection, validation
ticketid: 769370
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2013.3 1119</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>TabStrip for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

I am trying to validate current tab on selection of other tab and prevent tab active if current tab validation is not passing.

## Solution

Use the TabStrip's select event to check for validation errors and prevent selection.

```html
<div id="tabstrip">
    <ul>
        <li class="k-state-active">Tab 1</li>
        <li>Tab 2</li>
    </ul>
    <div>
        <div id="work-add-edit-form">
            <input id="fullname"
                   type="text"
                   name="fullname"
                   class="k-textbox"
                   placeholder="Full name"
                   required
                   validationMessage="Enter {0}"
                   style="width: 220px;" />
        </div>
    </div>
    <div>Content 2</div>
</div>

<script>
    var onSelect = function(e) {
        var container = $("#work-add-edit-form");
        kendo.init(container);
        container.kendoValidator();

        var validator = $("#work-add-edit-form").kendoValidator().data("kendoValidator");
        if (!validator.validateInput($("#fullname"))) {
          e.preventDefault();
        }
    };

    var tabStrip = $("#tabstrip").kendoTabStrip({
        select: onSelect
    }).data("kendoTabStrip");
</script>
```

## See Also
* [API Reference of the TabStrip](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip).
