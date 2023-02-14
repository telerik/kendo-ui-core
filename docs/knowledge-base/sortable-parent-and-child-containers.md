---
title: Create Sortable Parent and Child Containers
page_title: Create Sortable Parent and Child Containers 
description: "Learn how to create nested sortable containers."
slug: howto_sortableparentandchildcontainers_sortable
previous_url: /controls/interactivity/sortable/how-to/sortable-parent-and-child-containers
tags: telerik, kendo, jquery, sortable, create, sortable, parent, and, child, containers
component: sortable
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Sortable for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create nested Kendo UI Sortable containers?

## Solution

The following example demonstrates how to achieve the desired scenario.

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
