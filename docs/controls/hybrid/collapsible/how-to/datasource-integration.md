---
title: Use DataSource to render the content
page_title: Display content loaded via DataSource in Kendo UI Collapsible
description: Example that shows how to display content loaded via DataSource in Kendo UI Collapsible
---

# How to display content loaded via DataSource in Kendo UI Collapsible

Example that shows how to display content loaded via DataSource in Kendo UI Collapsible.

#### Example:

```html
<div data-role="view" data-init="onInit">
    <div data-role="collapsible" data-collapse="onCollapse" data-expand="onExpand">
        <h3>Header</h3>
        <div id="content"></div>
    </div>
</div>
  
<script id="template" type="text/x-kendo-template">
	<div>#:name#</div>
</script>

<script>
  	var template = kendo.template($("#template").html()); //create template
  	var dataSource = new kendo.data.DataSource({
      data: [
        { id: 1, name: "Jack" },
        { id: 2, name: "Jane" }
      ],
      change: function() {
         $("#content").html(kendo.render(template, this.view())); // populate the content
      }
    });
    function onInit() {
        dataSource.fetch(); //read the dataSource
    }
</script>

<script>
    var app = new kendo.mobile.Application(document.body);
</script>
```
