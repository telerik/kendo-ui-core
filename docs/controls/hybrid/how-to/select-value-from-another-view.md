---
title: Select value from another view
page_title: Select value from another view
description: Select value from another view
---

# Select value from another view

The example below demonstrates how to navigate to a child view from a ListView, select an item and return back to the parent view showing the selected item.

#### Example:

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
