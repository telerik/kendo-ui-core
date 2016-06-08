---
title: Create Relative Content Size Using Flexboxes
page_title: Create Relative Content Size Using Flexboxes | Kendo UI Hybrid Components
description: "Learn how to create relative content size using flexboxes when working with the Hybrid UI components of Kendo UI."
slug: howto_createrelative_contentsize_usingflexboxes_hybridui
---

# Create Relative Content Size Using Flexboxes



The example below demonstrates how to create a relative content size by using CSS3 flexboxes when working with the Hybrid UI components of Kendo UI.

###### Example

```html
     <div data-role="view" data-title="Percents" data-stretch="true">
      <div data-role="header">
        <div data-role="navbar">
          <div data-role="view-title"></div>
        </div>
      </div>
      <div style="display: flex; flex-direction:column">
        <div style="flex: 1; background: red"></div>
        <div style="flex: 3; background: blue"></div>
        <div style="flex: 2; background: green"></div>
      </div>
      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="" data-icon="home">Home</a>
          <a href="" data-icon="settings">Settings</a>
        </div>
      </div>
    </div>

    <script>
      new kendo.mobile.Application();
    </script>
```

## See Also

Articles and other how-to examples on the Kendo UI hybrid components:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})

For more runnable examples on the Kendo UI hybrid controls, browse the [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).
