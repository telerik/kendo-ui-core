---
title: Handling Hidden Columns in Grid with Drag and Drop
description: Learn how to manage hidden columns in the Kendo UI for jQuery Grid when using the row reorderable feature with hidden columns.
type: how-to
page_title: Managing Drag and Drop Hint for Hidden Columns in Kendo UI for jQuery Grid
meta_title: Managing Drag and Drop Hint for Hidden Columns in Kendo UI for jQuery Grid
slug: hidden-columns-row-reorderable-grid
tags: grid, jquery, hidden-columns, drag-and-drop, row-reorderable, filtering, sorting
res_type: kb
ticketid: 1708728
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Grid </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.4.1321 </td>
</tr>
</tbody>
</table>

## Description

I am using the row reorderable feature in the [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview) with hidden columns and column filtering/sorting. When dragging rows, the drag-and-drop hint shows the content of hidden columns, which is undesirable. Hidden columns contain data used to control context-related actions, but they should not appear in the drag-and-drop hint.

## Solution

To exclude hidden columns from the drag-and-drop hint in the Kendo UI for jQuery Grid, customize the internal `_draggableRows` function of the Grid. In the handler check if a column is visible when constructing the hint.

### Code Example

```dojo
<div class="k-d-flex k-flex-wrap">
        <div class="k-flex-grow">
            <h4 class="mb-sm">Available Products</h4>
            <div id="inStockProductsGrid"></div>
        </div>
        <div class="k-flex-grow">
            <h4 class="mb-sm">Not Available Products</h4>
            <div id="discontinuedGrid"></div>
        </div>
    </div>

    <script>
      kendo.ui.Grid.fn._draggableRows = function () {
	var that = this,
		selectable =
			that._checkBoxSelection || (that.options.selectable && !kendo.ui.Selectable.parseOptions(that.options.selectable).cell),
		clickMoveClick = false,
		isMobile = !!(that._isMobile || kendo.support.mobileOS),
		ITEMROW = "tr:not(.k-grouping-row):not(.k-detail-row):not(.k-footer-template):not(.k-group-footer):visible";
	if (that._draggableRowsInstance) {
		that._draggableRowsInstance.destroy();
	}
	if (
		this.options.reorderable.rows.clickMoveClick !== false &&
		this._hasDragHandleColumn
	) {
		clickMoveClick = true;
	}
	that._draggableRowsInstance = that.tbody
		.kendoDraggable({
			holdToDrag: isMobile,
			showHintOnHold: isMobile,
			preventOsHoldFeatures: isMobile,
			group: "row-draggable",
			autoScroll: true,
			filter: (selectable ? " > .k-selected" : " > " + ITEMROW) + (that._hasDragHandleColumn ? " > [ref-grid-drag-cell]" : ":not(:has([data-container-for]))"),
			hint: function (target) {
				var hint = $('<div class="k-reorder-clue k-drag-clue">' + kendo.ui.icon({ icon: "cancel", iconClass: "k-drag-status", }) + "</div>",);

				if (
					selectable &&
					that.select().length > 1 &&
					that.lockedContent
				) {
					hint.append(
						"<span>" +
						that.select().length / 2 +
						" " +
						encode(that.options.messages.itemsSelected) +
						"</span>",
					);
				} else if (
					selectable &&
					that.select().length > 1 &&
					!that.lockedContent
				) {
					hint.append(
						"<span>" +
						that.select().length +
						" " +
						encode(that.options.messages.itemsSelected) +
						"</span>",
					);
				} else {
					/* exclude invisible conlums */
					var clone = target.closest(ITEMROW).find("td:visible:not(.k-command-cell)").clone();
					clone.each(function (index, elm) {
						hint.append(
							"<span>" +
							elm.innerText.replace(/<(\/?)script([^>]*)>/gi, "") +
							"&nbsp;</span>",
						);
					});
				}
				return hint;
			},
			clickMoveClick: clickMoveClick,
			cursorOffset: { top: 0, left: 0 },
			/* do not allow drag and drop if the datasource filters or sorts the data */
			dragstart: function (e) {
				let kendoGrid = e.currentTarget.closest(".k-grid").data("kendoGrid");
				if (kendoGrid != undefined) {
					let ds = kendoGrid.dataSource;
					if (ds.filter() != undefined) {
						e.preventDefault();
					}
					let sort = ds.sort();
					if (sort != undefined && sort.length > 0) {
						e.preventDefault();
					}
				}
			},
		}).data("kendoDraggable");
};
      
        $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";
            var inStockData = [],
                discontinuedData = [];

            var discontinuedDS = new kendo.data.DataSource({
                data: discontinuedData,
                schema: {
                    model: {
                        id: "ProductID"
                    }                    },
                pageSize: 10
            });

            var inStockDS = new kendo.data.DataSource({
                data: inStockData,
                schema: {
                    model: {
                        id: "ProductID"
                    }
                },
                pageSize: 10,
            });

            
            $.ajax({
                type: "READ",
                url: crudServiceBaseUrl + "/Products",
                success: function (data) {
                    data.forEach(function (item) {
                        item.Discontinued === false ? inStockData.push(item) : discontinuedData.push(item);
                    });

                    discontinuedDS.data(discontinuedData);
                    inStockDS.data(inStockData);
                }
            });

            $("#inStockProductsGrid").kendoGrid({
                dataSource: inStockDS,
                pageable: true,
                height: 400,
                width: 550,
                columns: [
                    { draggable: true, width: "40px" },
                    { field: "ProductName", title: "Product Name", width: "200px" },
                    { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "140px", hidden: true },
                    {
                        field: "Discontinued", title: "In Stock",
                        template: "<span id='badge_#=ProductID#' class='badgeTemplate'></span>",
                        attributes: { style: "text-align: center;" },
                        width: "130px"
                    }],
                dataBound: onDataBound,
                navigatable: true,
                reorderable: {
                    rows: true
                },
                rowReorder: onRowRеordered
            });

            $("#discontinuedGrid").kendoGrid({
                dataSource: discontinuedDS,
                pageable: true,
                height: 400,
                width: 550,
                columns: [
                    { draggable: true, width: "40px" },
                    { field: "ProductName", title: "Product Name", width: "200px" },
                    { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "140px" },
                    {
                        field: "Discontinued", title: "In Stock",
                        template: "<span id='badge_#=ProductID#' class='badgeTemplate'></span>",
                        attributes: { style: "text-align: center;" },
                        width: "130px"
                    }],
                dataBound: onDataBound,
                navigatable: true,
                reorderable: {
                    rows: true
                },
                rowReorder: onRowRеordered
            });
        });

          const tr = {
                ProductID: 999,
                ProductName: "Placeholder",
                UnitPrice: "Placeholder",
                dummy: true,
        };

        function onDataBound(e) {
           var grid = this;

            if (grid.dataSource.get(tr.ProductID) && grid.dataSource.view().length > 1) {
                grid.dataSource.remove(grid.dataSource.get(tr.ProductID));
            };

            if (grid.dataSource.view().length === 0) {
              grid.dataSource.add(tr);
            }; 

            grid.table.find("tr").each(function () {
                var dataItem = grid.dataItem(this);
                var themeColor = dataItem.Discontinued ? 'error' : 'success';
                var text = dataItem.Discontinued ? 'not available' : 'available';

                
                $(this).find(".badgeTemplate").kendoBadge({
                    themeColor: themeColor,
                    text: text,
                });
            });
        };

        function onRowRеordered(ev) {
            var grid = ev.sender,
                dataSource = grid.dataSource,
                externalGrid, externalDataItem;

            if (ev.oldIndex === -1) { // Row dropped from external grid
                ev.preventDefault();
                externalGrid = ev.row.parents(".k-grid").data("kendoGrid");

                externalDataItem = externalGrid.dataItem(ev.row);

                if (!externalDataItem.dummy) {
                    externalDataItem.Discontinued === true ? externalDataItem.Discontinued = false : externalDataItem.Discontinued = true;
                    
                    externalGrid.dataSource.remove(externalDataItem);
                    dataSource.insert(ev.newIndex, externalDataItem.toJSON());

                    const dummyRow = dataSource.get(tr.ProductID);
                    
                    if (dummyRow) {
                        dataSource.remove(dummyRow);    
                    };
                };
            };
            
            if (externalGrid && externalGrid.dataSource.total() === 0) {
              externalGrid.dataSource.add(tr);
            };
        };
    </script>
```


## See Also

- [Kendo UI for jQuery Grid Row Drag and Drop](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/row-drag-drop)
- [jQuery Grid Drag and Drop Demo](https://demos.telerik.com/kendo-ui/grid/drag-drop)
