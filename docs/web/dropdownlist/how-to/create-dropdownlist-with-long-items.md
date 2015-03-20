---
title: List with long items
page_title: List with long items
description: Example that shows how to create Kendo UI DropDownList with long items
---

# How to create Kendo UI DropDownList with long items

Example that shows how to create Kendo UI DropDownList with long items

#### Example:

```html
<div id="div">
    <select id="ddl">
        <option>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</option>
        <option>item 2</option>
        <option>item 3</option>
    </select>
</div>
<script>
    $("#ddl").kendoDropDownList().parent().css("width", "100%");
</script>
<style>
html { font: 12px sans-serif; }

#div { width: 300px; }

.k-list-container .k-item {
    white-space: nowrap;
    float: left;
    clear: left;
    min-width: 100%;
    box-sizing: border-box;
}
</style>
```
