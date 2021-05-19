---
title: Create Sortable Parent and Child Containers
page_title: Create Sortable Parent and Child Containers | Kendo UI Sortable
description: "Learn how to create nested sortable containers."
slug: howto_sortableparentandchildcontainers_sortable
---

# Create Sortable Parent and Child Containers

The following example demonstrates how to create nested sortable containers.

```dojo
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

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
