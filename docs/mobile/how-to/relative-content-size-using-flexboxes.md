---
title: Relative content size using flexboxes
page_title: Relative content size using flexboxes
description: Relative content size using flexboxes
---

# Relative content size using flexboxes

The example below demonstrates how to create relative content size using CSS 3 flexboxes.

#### Example:

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

## Fixed content areas with scroller

The example below demonstrates how to create fixed/scrollable areas in the content part of a mobile view.

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
