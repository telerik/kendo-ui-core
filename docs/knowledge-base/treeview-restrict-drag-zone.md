---
title: Restrict a Drag Zone in the TreeView
description: An example on how to restrict a drag zone in the Kendo UI TreeView widget.
type: how-to
page_title: Restrict Drag Zones | Kendo UI TreeView for jQuery
slug: treeview-restrict-drag-zone
tags: treeview, restrict, drag, zone
res_type: kb
component: treeview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI TreeView</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2019.1.115 version</td>
 </tr>
</table>

## Description

The drag zone of the TreeView is on the entire node. How can I specify a dragging element in the node instead?

## Solution

Add a `dragFilter` option to the TreeView by overriding the implementation of the `_draggable` method.

```dojo
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/solid.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css">

    <div id="treeview"></div>

    <script>
      kendo.ui.TreeView.fn.options.dragFilter = null;

      kendo.ui.TreeView.fn._dragging = function() {
        var enabled = this.options.dragAndDrop;
        var dragging = this.dragging;
        if (enabled && !dragging) {
          var widget = this;
          var dragFilter = 'div:not(.k-state-disabled) .k-in';

          if (this.options.dragFilter && typeof this.options.dragFilter == 'string')
          {
            dragFilter = dragFilter + ' ' + this.options.dragFilter;
          }

          this.dragging = new kendo.ui.HierarchicalDragAndDrop(this.element, {
            reorderable: true,
            $angular: this.options.$angular,
            autoScroll: this.options.autoScroll,
            filter: dragFilter,
            allowedContainers: '.k-treeview',
            itemSelector: '.k-treeview .k-item',
            hintText: $.proxy(this._hintText, this),
            contains: function (source, destination) {
              return $.contains(source, destination);
            },
            dropHintContainer: function (item) {
              return item;
            },
            itemFromTarget: function (target) {
              var item = target.closest('.k-top,.k-mid,.k-bot');
              return {
                item: item,
                content: target.closest('.k-in'),
                first: item.hasClass('k-top'),
                last: item.hasClass('k-bot')
              };
            },
            dropPositionFrom: function (dropHint) {
              return dropHint.prevAll('.k-in').length > 0 ? 'after' : 'before';
            },
            dragstart: function (source) {
              return widget.trigger('dragstart', { sourceNode: source[0] });
            },
            drag: function (options) {
              widget.trigger('drag', {
                originalEvent: options.originalEvent,
                sourceNode: options.source[0],
                dropTarget: options.target[0],
                pageY: options.pageY,
                pageX: options.pageX,
                statusClass: options.status,
                setStatusClass: options.setStatus
              });
            },
            drop: function (options) {
              var dropTarget = $(options.dropTarget);
              var navigationTarget = dropTarget.closest('a');
              if (navigationTarget && navigationTarget.attr('href')) {
                widget._tempPreventNavigation(navigationTarget);
              }
              return widget.trigger('drop', {
                originalEvent: options.originalEvent,
                sourceNode: options.source,
                destinationNode: options.destination,
                valid: options.valid,
                setValid: function (state) {
                  this.valid = state;
                  options.setValid(state);
                },
                dropTarget: options.dropTarget,
                dropPosition: options.position
              });
            },
            dragend: function (options) {
              var source = options.source;
              var destination = options.destination;
              var position = options.position;
              function triggerDragEnd(source) {
                if (widget.options.checkboxes && widget.options.checkboxes.checkChildren) {
                  widget.updateIndeterminate();
                }
                widget.trigger('dragend', {
                  originalEvent: options.originalEvent,
                  sourceNode: source && source[0],
                  destinationNode: destination[0],
                  dropPosition: position
                });
              }
              if (position == 'over') {
                widget.append(source, destination, triggerDragEnd);
              } else {
                if (position == 'before') {
                  source = widget.insertBefore(source, destination);
                } else if (position == 'after') {
                  source = widget.insertAfter(source, destination);
                }
                triggerDragEnd(source);
              }
            }
          });
        } else if (!enabled && dragging) {
          dragging.destroy();
          this.dragging = null;
        }
      };
    </script>

    <script>
        $(function () {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [
                    { text: "Furniture", items: [
                        { text: "Tables & Chairs" },
                        { text: "Sofas" },
                        { text: "Occasional Furniture" }
                    ] },
                    { text: "Decor", items: [
                        { text: "Bed Linen" },
                        { text: "Curtains & Blinds" },
                        { text: "Carpets" }
                    ] }
                ]
            });

            $("#treeview").kendoTreeView({
                dataSource: dataSource,
                dragAndDrop: true,
                dragFilter: ".drag-handler",
                template: $('#treeview-item-template').html()
            }).data("kendoTreeView")
                .templates
                .dragClue = kendo.template($('#treeview-drag-clue-template').html());
        });
    </script>

    <script id="treeview-item-template" type="text/x-kendo-template">
        <div class="drag-handler"><i class="fa fa-grip-vertical fa-fw"></i></div>
        #: item.text #
    </script>

    <script id="treeview-drag-clue-template" type="text/x-kendo-template">
        #: item.text #
    </script>

    <style>
        .k-treeview .k-i-drag-and-drop {
            margin-left: 7px;
            margin-top: -7px;
            width: auto;
            height: auto;
        }

        .drag-handler {
            display: inline-block;
            color:rgba(0,0,0,.44);
            cursor:grab;
        }
    </style>
```
