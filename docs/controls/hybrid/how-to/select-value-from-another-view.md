---
title: Select Value from Another View
page_title: Select Value from Another View | Kendo UI Hybrid Components
description: "Learn how to select value from another view when working with the Hybrid UI components of Kendo UI."
slug: howto_selectvaluefrom_anotherview_hybridui
---

# Select Value from Another View

The example below demonstrates how to navigate to a child view from a ListView, select an item and return back to the parent view showing the selected item when working with the Hybrid UI components of Kendo UI.

###### Example

```html
    <div data-role="view" data-model="app.models.survey" data-title="Survey" data-stretch="true" id="survey">
      <form>
        <ul data-role="listview" data-type="group">
          <li class="detail-text">
            Did you order an appetizer?
            <ul>
              <li>
                <a href="locations">Location <span class="location" data-bind="html: selectedLocation"></span></a>
              </li>
            </ul>
          <li>
        </ul>
      </form>
    </div>

    <div data-role="view" id="locations" data-transition="slide" data-model="app.models.locations">
      <ul data-role="listview" data-bind="click: selectLocation, source: locations" data-template="locations-template">
      </ul>
    </div>

    <script id="locations-template" type="text/x-kendo-template">
   		#: text #
    </script>
    <script>
      (function() {

        var survey = new kendo.observable({
          selectedLocation: null
        });

        var locations = new kendo.observable({
          locations: new kendo.data.DataSource({
            data: [
              { text: "north" },
              { text: "south" },
              { text: "east" },
              { text: "west" }
            ]
         }),
          selectLocation: function(e) {
            survey.set("selectedLocation", e.dataItem.text);
            app.navigate("#survey");
          }
        });

        var app = new kendo.mobile.Application(document.body);

        window.app = {};
        window.app.models = {
          survey: survey,
          locations: locations
        };

      }());
    </script>
```

## See Also

Articles and other how-to examples on the Kendo UI hybrid components:

* [Overview of the Hybrid UI Components in Kendo UI]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})

For more runnable examples on the Kendo UI hybrid controls, browse the [**How To** documentation folder]({% slug include_esri_map_mobile_application %}).
