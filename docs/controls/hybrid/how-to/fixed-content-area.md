---
title: Create Fixed Content Areas with Scroller
page_title: Create Fixed Content Areas with Scroller | Kendo UI Hybrid Components
description: "Learn how to create fixed content area when working with the Hybrid UI components of Kendo UI."
slug: howto_createfixedcontentarea_hybridui
---

# Create Fixed Content Areas with Scroller

The example below demonstrates how to create fixed/scrollable areas in the content part of a mobile view when working with the Hybrid UI components of Kendo UI.

####### Example

```html
    <div data-role="view" data-title="Flexbox Demo" id="scroller-view" data-init="listViewInit" data-stretch="true">
      <header data-role="header">
        <div data-role="navbar">
          <span data-role="view-title"></span>
          <a data-align="right" data-role="button" class="nav-button" href="#index">Index</a>
        </div>
      </header>
      <footer data-role="footer">
        <div data-role="tabstrip">
          <a data-icon="home">Home</a>
        </div>
      </footer>
      <div class="container">
        <div class="search">
          <input type="search" class="k-textbox" placeholder="Search..." />
        </div>
        <div data-role="scroller" class="scroller-content">
          <ul id="flat-listview"></ul>
        </div>
        <div class="static">
          This is some static text
        </div>
      </div>
    </div>
    <script>

      var data = [ "Sashimi salad", "Chirashi sushi", "Seaweed salad", "Edamame", "Miso soup", "Maguro", "Shake", "Shiromi", "Tekka maki", "Hosomaki Mix", "California rolls", "Seattle rolls", "Spicy Tuna rolls", "Ebi rolls", "Chicken Teriyaki", "Salmon Teriyaki", "Gohan", "Tori Katsu", "Yaki Udon", "Sashimi salad", "Chirashi sushi", "Seaweed salad", "Edamame", "Miso soup", "Maguro", "Shake", "Shiromi", "Tekka maki", "Hosomaki Mix", "California rolls", "Seattle rolls", "Spicy Tuna rolls", "Ebi rolls", "Chicken Teriyaki", "Salmon Teriyaki", "Gohan", "Tori Katsu", "Yaki Udon" ];

      function listViewInit() {
        $("#flat-listview").kendoMobileListView({ dataSource: data });
      }
    </script>
    <style scoped>
      .container {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        display: -moz-box;
        -moz-box-orient: vertical;
      }

      #scroller-view .scroller-content {
        -webkit-box-flex:1;
        -moz-box-flex: 1;
      }
      .search {
        -webkit-box-flex: 0%; /* setting the search div to get 0% of the remaining window value  */
        -moz-box-flex:  0%;
      }
      .static{
        -webkit-box-flex: 0%; /* setting the static div to get 0% of the remaining window value  */
        -moz-box-flex:  0%;
        line-height:50px;
        vertical-align:middle;
        text-align:center;
        font-size:18px;
        background-color:#e15613;
        color:#fff;
      }
    </style>
    <script>
      var app = new kendo.mobile.Application(document.body);
    </script>
```

## See Also

Articles and other how-to examples on the Kendo UI hybrid components:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})

For more runnable examples on the Kendo UI hybrid controls, browse the [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).
