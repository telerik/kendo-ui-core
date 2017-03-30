---
title: Sortable parent and child containers
page_title: Sortable parent and child containers | Kendo UI Sortable
description: "Learn how to create nested sortable containers"
slug: howto_sortableparentandchildcontainers_sortable
---

# Sortable parent and child containers

The example below demonstrates how to create nested sortable containers.

###### Example

```html
     <div id="baSurveyGroupTemplateListView">
      <div class="panel panel-default baSurveyGroupPanel">
        <div class="panel-heading">
          <h4 class="panel-title">Title 1</h4>
        </div>
        <div class="panel-body">
          <div class="childBaSurveyGroupTemplate">
            <div class="panel panel-default baSurveyGroupPanel">
              <div class="panel-heading">
                <h4 class="panel-title">Title 2</h4>
              </div>
            </div>
            <div class="panel panel-default baSurveyGroupPanel">
              <div class="panel-heading">
                <h4 class="panel-title">Title 3</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default baSurveyGroupPanel">
        <div class="panel-heading">
          <h4 class="panel-title">Title 1.1 </h4>
        </div>
        <div class="panel-body">
          <div class="childBaSurveyGroupTemplate">
            <div class="panel panel-default baSurveyGroupPanel">
              <div class="panel-heading">
                <h4 class="panel-title">Title 2.1</h4>
              </div>
            </div>
            <div class="panel panel-default baSurveyGroupPanel">
              <div class="panel-heading">
                <h4 class="panel-title">Title 2.2</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      $("#baSurveyGroupTemplateListView").kendoSortable({
        connectWith: ".childBaSurveyGroupTemplate",
        filter: "> .baSurveyGroupPanel",
        axis: "y",
        cursor: "move:",
        hint: function (element) {
          return element.clone().addClass("hint");
        },
        placeHolder: function (element) {
          return element.clone().addClass("policy-section-panel-placeholder").text("Drop Here!");
        },
        change: function (e) {
          alert(e.oldIndex);
          alert(e.newIndex);
        },
        ignore: ".childBaSurveyGroupTemplate >.baSurveyGroupPanel > .panel-heading > .panel-title",
        autoScroll: true
      });

      $(".childBaSurveyGroupTemplate").kendoSortable({
        connectWith: "#baSurveyGroupTemplateListView",
        filter: "> .baSurveyGroupPanel",
        axis: "y",
        cursor: "move",
        hint: function (element) {
          return element.clone().addClass("hint");
        },
        placeholder: function (element) {
          return element.clone().addClass("policy-section-panel-placeholder").text("Drop Here!");
        },
        change: function (e) {
          alert(e.oldIndex);
          alert(e.newIndex);
        },
        autoScroll: true
      });
    </script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})

For more runnable examples on the Kendo UI Sortable, browse its [**How To** documentation folder]({% slug howto_usesortablewithgrid_inincellediting_sortable %}).
