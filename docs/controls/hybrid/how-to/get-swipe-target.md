---
title: Get the Swipe Target
page_title: Get the Swipe Target | Kendo UI Hybrid Components
description: "Learn how to get the reference of the swiped element in touchStart and then use it in the swipe handler."
slug: howto_gettheswipetarget_hybridui
---

# Get the Swipe Target

The example below demonstrates how to save the reference of the swiped element in `touchStart` and then use it in the `swipe` handler.

###### Example

```html
    <title>Kendo UI Snippet</title>

    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2016.2.607/js/kendo.all.min.js"></script>

    <div id="grid"></div>
   <script>
   $(function(){
     var tr;
     $("#grid").kendoGrid({
       columns: [
         { field: "name", width: "200px" },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     }).kendoTouch({
       touchstart: function(e) {
         tr = $(e.event.target).closest("tr");
       },
       enableSwipe: true,
       swipe: function(e) {
         alert("swipe " + e.direction + " " + tr.text());
       }
     });
     });

   </script>
```

## See Also

Articles and other how-to examples on the Kendo UI hybrid components:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})

For more runnable examples on the Kendo UI hybrid controls, browse the [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).
