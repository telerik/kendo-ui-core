---
title: Drill Down Navigation Always Starting from Root Tuple
page_title: Drill Down Navigation Always Starting from Root Tuple | Kendo UI PivotGrid Widget
description: "Learn how to make the Kendo UI PivotGrid widget drill down on expand, always starting from the expanded member."
slug: howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid
---

# Drill Down Navigation Always Starting from Root Tuple

The example below demonstrates how to change the widget's configuration on member expand. In this way the Kendo UI PivotGrid widget drills down on expand, but always starting from the expanded member.

###### Example

```html
 <script>
    //CUSTOM WIDGET THAT HANDLES THE SLICING!
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var LIST_HTML = '<div class="k-fieldselector k-list-container k-reset"><ul class="k-pivot-configurator-settings k-list k-reset k-pivot-setting"/></div>';

    var PivotSlicer = Widget.extend({
      init: function(element, options) {
        Widget.fn.init.call(this, element, options);

        this.dataSource = this.options.dataSource;

        if (!this.dataSource) {
          throw new Error("PivotDataSource instance is required");
        }

        this.itemTemplate = kendo.template(this.options.itemTemplate);

        this._setSettings();

        this._lists();

        this.refresh();
      },

      options: {
        name: "PivotSlicer",
        itemTemplate: '<li class="#:className#" data-idx="#:idx#">#: name #</li>',
        mergeChildren: false
      },

      _setSettings: function() {
        var columns = this.dataSource.columns().slice();
        var rows = this.dataSource.rows().slice();

        this.columns = isExpanded(columns) ? [{ name: getName(columns), settings: columns }] : [];
        this.rows = isExpanded(rows) ? [{ name: getName(rows), settings: rows }] : [];
      },

      setDataSource: function(source) {
        this.dataSource = source;
        this._setSettings();
        this.refresh();
      },

      push: function(axis, path) {
        var settings = this.dataSource[axis]();
        var length = path.length - 1;

        if (this.options.mergeChildren && length > 0) {
          return false;
        }

        for (var idx = 0; idx <= length; idx++) {
          settings[idx] = {
            expand: idx === length,
            name: [path[idx]]
          };
        }

        this[axis].push({
          name: JSON.stringify(path),
          settings: settings
        });

        this.update(axis, settings);

        return true;
      },

      pop: function(axis, idx) {
        var axisState = this[axis][idx];

        this[axis] = this[axis].slice(0, idx + 1);

        if (axisState) {
          this.update(axis, axisState.settings);
        }
      },

      update: function(axis, settings) {
        this.dataSource[axis](settings);
        this.refresh();
      },

      refresh: function() {
        this.columnsList.html(this._buildHtml(this.columns));
        this.rowsList.html(this._buildHtml(this.rows));
      },

      _lists: function() {
        this.element.append("<h4>Columns:</h4>");
        this.columnsList = $(LIST_HTML).appendTo(this.element).children("ul");

        this.element.append("<h4>Rows:</h4>");
        this.rowsList = $(LIST_HTML).appendTo(this.element).children("ul");

        this.columnsList.on("click", "li:not(.k-state-selected)", (function(e) {
          var idx = $(e.currentTarget).data("idx");

          this.pop("columns", idx);
        }).bind(this));

        this.rowsList.on("click", "li:not(.k-state-selected)", (function(e) {
          var idx = $(e.currentTarget).data("idx");

          this.pop("rows", idx);
        }).bind(this));

        this.columnsList.add(this.rowsList)
        .on("mouseenter mouseleave", "li", this._toggleHover);
      },

      _toggleHover: function(e) {
        $(e.currentTarget).toggleClass("k-state-hover", e.type === "mouseenter");
      },

      _buildHtml: function(list) {
        var html = "";
        var length = list.length;

        for (var idx = 0; idx < length; idx++) {
          var className = "k-item k-header" + (idx === (length - 1) ? " k-state-selected" : "");

          html += this.itemTemplate({
            idx: idx,
            name: list[idx].name,
            className: className
          });
        }

        return html;
      }
    });

    function isExpanded(settings) {
      for (var idx = 0; idx < settings.length; idx++) {
        if (settings[idx].expand) {
          return true;
        }
      }
      return false;
    }

    function getName(settings) {
      var name = [];
      for (var idx = 0; idx < settings.length; idx++) {
        if (settings[idx].expand) {
          name.push(settings[idx].name);
        }
      }

      return JSON.stringify(name);
    }

    kendo.ui.plugin(PivotSlicer);

  </script>
  <div id="slicer"></div>
  <div id="pivotgrid"></div>

  <script>
    $(function() {
      var columns = [
        { name: "[Date].[Calendar]", expand: true },
        { name: "[Reseller].[Reseller Type]" }
      ];
      var rows = [{ name: "[Ship Date].[Calendar]" }];

      var options = {
        type: "xmla",
        rows: rows.slice(),
        columns: columns.slice(),
        measures: {
          axis: "columns",
          values: ["[Measures].[Reseller Freight Cost]", "[Measures].[Internet Sales Amount]"]
        },
        transport: {
          connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
          },
          read: "//demos.telerik.com/olap/msmdpump.dll"
        },
        schema: {
          type: "xmla"
        },
        error: function (e) {
          alert("error: " + kendo.stringify(e.errors[0]));
        }
      };

      var dataSource = new kendo.data.PivotDataSource(options);

      var slicer = $("#slicer").kendoPivotSlicer({
        dataSource: dataSource
      }).data("kendoPivotSlicer");

      var pivot = $("#pivotgrid").kendoPivotGrid({
        dataSource: dataSource,
        columnWidth: 200,
        height: 580,
        expandMember: function (e) {
          if (!e.childrenLoaded && slicer.push(e.axis, e.path)) {
            e.preventDefault();
          }
        }
      }).data("kendoPivotGrid");
    });
  </script>
```

## See Also

Other articles on Kendo UI PivotGrid:

* [JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Access MDX Query]({% slug howto_access_mdx_query_pivotgrid %})
* [How to Add Dimension to Column Axis]({% slug howto_add_dimension_column_axis_pivotgrid %})
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Expand "Include fields" TreeView]({% slug howto_expand_include_fields_treeview_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the "include" Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Filter Dimensions]({% slug howto_filter_dimensions_pivotgrid %})
* [How to Integrate with Kendo UI Chart]({% slug howto_integratewith_kendoui_chart_pivotgrid %})
* [How to Make "Include fields" Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [How to Modify Exported Excel Files]({% slug howto_modify_exported_excel_files_pivotgrid %})
* [How to Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [How to Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [How to Render Row Header Caption As Anchor]({% slug howto_render_rowheader_captionas_anchor_pivotgrid %})
* [How to Right-Align Text]({% slug howto_right_align_text_pivotgrid %})
* [How to Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [How to Sort Dimensions]({% slug howto_sort_dimensions_pivotgrid %})
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})
* [How to Translate PivotGrid Messages]({% slug howto_translate_pivotgrid_messages_pivotgrid %})