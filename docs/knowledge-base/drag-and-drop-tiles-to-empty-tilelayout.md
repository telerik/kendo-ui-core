---
title: Drag and Drop Tiles to an Empty TileLayout
description: "Learn How to Drag and Drop Tiles to an Empty TileLayout"
type: how-to
page_title: How to Drag and Drop Tiles to an Empty TileLayout - Kendo UI TileLayout for jQuery
slug: drag-and-drop-tiles-empty-tilelayout
tags: kendo, jquery, tilelayout, tile, drag, and, drop, empty
ticketid: 1570416
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® TileLayout for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I drag and drop new tiles after removing all of the tiles from the TileLayout?

## Solution

1. Add logic for adding an empty tile upon removing the last one.
2. Change tile background color and remove borders of the empty tile so it is not visible to the users.
3. Add logic for removing the empty tile when the first new tile is dropped.

```dojo

        <div id="example">
      <div id="main-layout"></div>
      <div id="side-layout"></div>

      <script id="empty" type="text/x-kendo-template">
    		<div class="info-container">

        </div>
      </script>

      <script id="new-customers" type="text/x-kendo-template">
        <div class="info-container">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>
            <img src="../content/web/tilelayout/arrow_up_512x512.png" class="arrow-class" />
            <div class="info-holder">
                <span class="item-values">35445</span>
                <span class="text-indicator">New customers</span>
        </div>
        </div>
      </script>

      <script id="returning-customers" type="text/x-kendo-template">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>

        <div id="returning-chart"></div>

        <div class="info-container">
            <div class="info-holder">
                <span class="item-values">17% <img src="../content/web/tilelayout/target_512x512.png" class="arrow-class" /></span>
                <span class="text-indicator">Returning customers</span>
        </div>
        </div>
      </script>

      <script id="new-deals" type="text/x-kendo-template">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>

        <div id="new-deals-chart"></div>

        <div class="info-container">
            <div class="info-holder">
                <span class="item-values">50% <img src="../content/web/tilelayout/handshake_512x512.png" class="arrow-class" /></span>
                <span class="text-indicator">New deals this year</span>
        </div>
        </div>
      </script>

      <script id="new-visitors" type="text/x-kendo-template">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>
        <div class="info-container">
            <div class="info-holder">
                <span class="item-values">91694</span>
                <span class="text-indicator">New visitors this year</span>
        </div>
        </div>
      </script>


      <script id="expense" type="text/x-kendo-template">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>
        <div class="info-container">
            <img src="../content/web/tilelayout/arrow_down_512x512.png" class="arrow-class" />
            <div class="info-holder">
                <span class="item-values">$973</span>
                <span class="text-indicator">Expense this period</span>
        </div>
        </div>
      </script>

      <script id="income" type="text/x-kendo-template">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>
        <div class="info-container">
            <img src="../content/web/tilelayout/arrow_up_512x512.png" class="arrow-class" />
            <div class="info-holder">
                <span class="item-values">$5890</span>
                <span class="text-indicator">Income this period</span>
        </div>
        </div>
      </script>

      <script id="deals" type="text/x-kendo-template">
        <a class='k-button k-button-flat-base k-button-flat k-button-md k-rounded-md k-icon-button k-close-button'><span class='k-button-icon k-icon k-i-close'></span></a>
        <div class="info-container">
            <img src="../content/web/tilelayout/arrow_up_512x512.png" class="arrow-class" />
            <div class="info-holder">
                <span class="item-values">2745</span>
                <span class="text-indicator">Total deals</span>
        </div>
        </div>
      </script>

      <script>
        var VisitorsSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: function () {
                return "../content/dataviz/dashboards/visitors.json";
              },
              dataType: "json"
            }
          },
          group: {
            field: "category", aggregates: [{ field: "customers", aggregate: "sum" }]
          },
        });

        function getChartData() {
          var chartData = [];
          var total = 0;
          var view = VisitorsSource.view();
          for (var idx = 0; idx < view.length; idx++) {
            total += view[idx].aggregates.customers.sum;
          }

          for (var idx = 0; idx < view.length; idx++) {
            chartData.push({
              category: view[idx].value,
              customersPc: Math.round(view[idx].aggregates.customers.sum / total * 100)
            });
          }
          return chartData;
        }

        VisitorsSource.fetch(function () {

          VisitorsSource.read();

          createCharts();
        });

        function createCharts() {

          $("#returning-chart").kendoChart({
            legend: {
              visible: false
            },
            dataSource: getChartData(),
            series: [{
              type: "pie",
              field: "customersPc",
              categoryField: "category",
              aggregate: "sum",
              padding: 0,
              color: "red"
            }],
            chartArea: {
              background: "transparent"
            },
            tooltip: {
              visible: true,
              format: "{0}%"
            }
          });

          $("#new-deals-chart").kendoChart({
            legend: {
              visible: false
            },
            dataSource: getChartData(),
            series: [{
              type: "pie",
              field: "customersPc",
              categoryField: "category",
              aggregate: "sum",
              padding: 0
            }],
            chartArea: {
              background: "transparent"
            },
            tooltip: {
              visible: true,
              format: "{0}%"
            }
          });
        }

        var mainLayout = $("#main-layout").kendoTileLayout({
          containers: [{
            colSpan: 2,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#income").html())
          }, {
            colSpan: 2,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#expense").html())
          }, {
            colSpan: 2,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#deals").html())
          }],
          columns: 6,
          width: 1000,
          columnsWidth: 210,
          rowsHeight: 150
        }).data("kendoTileLayout");


        var sideLayout = $("#side-layout").kendoTileLayout({
          containers: [{
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#new-customers").html())
          }, {
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#returning-customers").html())
          }, {
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#new-deals").html())
          }, {
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#new-visitors").html())
          }],
          columns: 1,
          width: 350,
          rowsHeight: 150
        }).data("kendoTileLayout");

        var originalElement;
        var dropHint;

        var draggable = new kendo.ui.Draggable($("#side-layout"), {
          filter: ".k-tilelayout-item",
          autoScroll: true,
          group: "kendo-demo",
          hint: function (target) {
            var item = target;
            var width = item.width();
            var height = item.height();
            var clone = item.clone();

            clone.find(".k-button").hide();
            return clone.width(width).height(height);
          },
          dragstart: function (e) {
            originalElement = $(e.currentTarget).closest(".k-tilelayout-item");
            originalElement.addClass("k-state-active");
          },
          drag: function (e) {
            var elementUnderCursor = kendo.elementUnderCursor(e);
            var hint = e.sender.hint;
            var dropContainer;
            var containerBoundaries;
            var pixelsToLeftBorder;
            var pixelsToRightBorder;
            var direction;
            var newOrder;
            var clone;

            if (containsOrEqualTo(hint[0], elementUnderCursor)) {
              hint.hide();

              elementUnderCursor = kendo.elementUnderCursor(e);

              if (!containsOrEqualTo($("#side-layout")[0], elementUnderCursor)) {

                dropContainer = $(elementUnderCursor);
                dropContainer = dropContainer.hasClass("k-tilelayout-item") ? dropContainer : dropContainer.closest(".k-tilelayout-item.k-card");

                if (dropContainer.hasClass("k-tilelayout-item")) {
                  containerBoundaries = dropContainer[0].getBoundingClientRect();
                  pixelsToLeftBorder = e.clientX - containerBoundaries.left;
                  pixelsToRightBorder = containerBoundaries.right - e.clientX;
                  direction = pixelsToLeftBorder > pixelsToRightBorder ? "right" : "left";
                  newOrder = dropContainer.css("order");

                  if (dropHint && dropHint.attr("direction") !== direction) {
                    clone = dropHint.clone();
                    clone.css("order", newOrder);
                    dropHint.remove();
                    dropHint = clone;

                    insertHint(dropHint, dropContainer, direction);

                    dropHint.attr("direction", direction);
                  }
                }
              }
              hint.show();
            }
          },
          dragend: function (e) {

            originalElement.removeClass("k-state-active");

            if (!dropHint) {
              return;
            }
            var newOrder = dropHint.index();
            var container = e.currentTarget.closest(".k-tilelayout-item.k-card");
            var itemId = container.attr("id");
            var mainItems = mainLayout.items;
            var item = sideLayout.itemsMap[itemId];
            var sideItems = sideLayout.items;

            dropHint.remove();
            e.sender.hint.remove();
            dropHint = null;

            item.colSpan = 2;

            mainItems.splice(newOrder, 0, item);

            sideItems.splice(sideItems.indexOf(item), 1);
            mainItems.forEach(function(item, idx) {
              if(mainItems[idx].colSpan == 1) {
                mainItems.splice(idx, 1)
              }
            })

            recreateSetup(mainItems, sideItems);
          }
        });

        $("#main-layout").kendoDropTargetArea({
          filter: ".k-tilelayout-item",
          group: "kendo-demo",
          dragenter: function (e) {
            var dropContainer = $(e.dropTarget);
            var dropContainerBoundaries;
            var pixelsToLeftBorder;
            var pixelsToRightBorder;
            var direction;

            if (originalElement[0] != dropContainer[0]) {

              dropContainerBoundaries = dropContainer[0].getBoundingClientRect();
              pixelsToLeftBorder = e.clientX - dropContainerBoundaries.left;
              pixelsToRightBorder = dropContainerBoundaries.right - e.clientX;
              direction = pixelsToLeftBorder > pixelsToRightBorder ? "right" : "left";

              if (dropHint) {
                dropHint.remove();
                dropHint = null;
              }

              originalElement.hide();

              dropHint = createDropHint(dropContainer.css("order"));

              originalElement.hide();

              insertHint(dropHint, dropContainer, direction);
            }
          }
        });

        $("#main-layout").on("click", ".k-button", function (e) {
          var itemId = $(e.currentTarget).closest(".k-tilelayout-item").attr("id");
          var mainItems = mainLayout.items;
          var sideItems = sideLayout.items;
          var item = mainLayout.itemsMap[itemId];

          mainItems.splice(mainItems.indexOf(item), 1);
          sideItems.push(item);

          item.colSpan = 1;

          recreateSetup(mainItems, sideItems);
        });

        function createDropHint(order) {
          return $("<div class='k-layout-item-hint k-layout-item-hint-reorder'></div>")
            .css({
            "order": order,
            "grid-column-end": "span 2",
            "grid-row-end": "span 1"
          });
        }

        function insertHint(dropHint, dropContainer, direction) {
          if (direction == "right") {
            dropHint.insertAfter(dropContainer);
          } else {
            dropHint.insertBefore(dropContainer);
          }
        }

        function containsOrEqualTo(parent, child) {
          try {
            return $.contains(parent, child) || parent == child;
          } catch (e) {
            return false;
          }
        }

        function recreateSetup(mainItems, sideItems) {
          for (var i = 0; i < Math.max(mainItems.length, sideItems.length); i++) {
            if (mainItems[i]) {
              mainItems[i].order = i;
            }
            if (sideItems[i]) {
              sideItems[i].order = i;
            }
          }

          if(!mainItems.length) {
            var items = mainLayout.items;
            var item = {
              colSpan: 1,
              rowSpan: 1,
              bodyTemplate: kendo.template($("#empty").html())
            };
            items.push(item);
            mainLayout.setOptions({ containers: items });
            $(".k-tilelayout-item").css({backgroundColor: "#F6F6F6", borderWidth: "0px" })

          } else {
            mainLayout.setOptions({ containers: mainItems });
            sideLayout.setOptions({ containers: sideItems });
          }

          createCharts();
        }

        $(window).on("resize", function () {
          kendo.resize($(".k-card-body"));
        });
      </script>
    </div>

    <style>
      .arrow-class {
        width: 36px;
        vertical-align: bottom;
        align-self: center;
      }

      .close-button {
        float: right;
      }

      .item-values {
        color: #00000099;
        font-size: 25px;
        font-weight: bold;
      }

      .info-container {
        display: flex;
        align-items: start;
      }

      .info-holder {
        margin-left: 10px;
        display: inline-flex;
        flex-direction: column;
      }

      .text-indicator {
        text-align: left;
        letter-spacing: 0.14px;
        color: #A2A2A2;
      }

      .k-close-button {
        position: absolute;
        right: 0;
        top: 0;
        margin: 5px;
      }

      .k-card-body {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .k-chart {
        height: 75px;
        width: 75px;
      }

      #example {
        display: flex;
      }

      #side-layout {
        background-color: #D3D3D3;
        border-left: 2px solid #BCBCBC;
      }

      #main-layout {
        background-color: #F6F6F6;
      }

      #side-layout .k-button {
        display: none;
      }

      .k-tilelayout-item:active,
      .k-tilelayout-item.k-state-active {
        opacity: 0.2;
      }

      .k-metroblack .item-values,
      .k-black .item-values,
      .k-highcontrast .item-values,
      .k-materialblack .item-values,
      .k-moonlight .item-values {
        color: #fff;
      }
    </style>
```

## See Also

* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
