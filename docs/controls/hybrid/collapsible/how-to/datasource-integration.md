---
title: Use DataSource to Render Content
page_title: Use DataSource to Render Content | Hybrid UI Collapsible
description: "Learn how to display content loaded via the DataSource in the hybrid mobile Kendo UI Collapsible widget ."
slug: howto_usedatasourcetorebdercontent_hybridcollapsible
---

# Use DataSource to Render Content

The example below demonstrates how to display content loaded via the DataSource in the hybrid mobile Kendo UI Collapsible widget.

###### Example

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

## See Also

Other articles on the Hybrid UI Collapsible:

* [Hybrid UI Collapsible JavaScript API Reference](/api/javascript/mobile/ui/collapsible)
* [Overview of the Hybrid UI Collapsible]({% slug overview_hybridcollapsible %})
