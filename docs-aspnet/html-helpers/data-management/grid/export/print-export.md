---
title: Printing
page_title: Printing
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} allowing you to select only the Grid content on a page for printing."
slug: printing_gridhelper_aspnetcore
position: 4
---

# Printing

Even though the content of the Grid might not be the only content on a page, the Grid provides options to ignore the rest of the page and print only its contents.

To print only the Grid from a page, use either of the following approaches:
* Print the existing page and hide the irrelevant content with print CSS.
* Print a separate web page with only the Grid on it.

## Printing Existing Web Pages

To print only the Grid as part of an existing web page, use a print stylesheet to hide the parts of the page that you do not need. The exact CSS for printing will depend on the existing page content.

## Printing New Web Pages

The following example demonstrates how to retrieve the HTML of the Grid, inject it in a new browser window, and print the new page. This approach also addresses the following important issues:
* If the Grid is scrollable, some rows or columns may not be visible on the printed paper. Therefore, the Grid height and scrollability are disabled on the print-friendly page.
* Depending on the column width, some of the cell content may be clipped and not fully visible. This issue is resolved by forcing an automatic `table-layout` to the Grid table which disables the ellipsis (`...`).
* If scrolling is enabled (which is set by default except for the MVC wrapper of the Grid), the Grid renders a [separate table for the header area]({% slug htmlhelpers_grid_aspnetcore_scrolling %}). Because the browser does not relate the two Grid tables, it will not repeat the header row on top of every printed page. The following example demonstrates how to address this issue by cloning the header table row into the data table.
* When you print a Grid with locked (frozen) columns, it is possible that the resulting columns or rows get misaligned or that the overall layout gets broken. In such cases, use a separate print-friendly Grid instance with no frozen columns.

        <button type="button" class="k-button" id="printGrid">Print Grid</button>
        @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
            .Name("grid")
            .Columns(c =>
            {
                c.Bound(f => f.OrderID);
                c.Bound(f => f.ShipCountry);
            })
            .DataSource(d =>
            {
                d.Ajax()
                .Read(r => r.Action("ReadOrders", "Home"));
            })
        )
        <script>
            function printGrid() {
                var gridElement = $('#grid'),
                    printableContent = '',
                    win = window.open('', '', 'width=800, height=500, resizable=1, scrollbars=1'),
                    doc = win.document.open();

                var htmlStart =
                    '<!DOCTYPE html>' +
                    '<html>' +
                    '<head>' +
                    '<meta charset="utf-8" />' +
                    '<title>Kendo UI Grid</title>' +
                    '<link href="https://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
                    '<style>' +
                    'html { font: 11pt sans-serif; }' +
                    '.k-grid { border-top-width: 0; }' +
                    '.k-grid, .k-grid-content { height: auto !important; }' +
                    '.k-grid-content { overflow: visible !important; }' +
                    'div.k-grid table { table-layout: auto; width: 100% !important; }' +
                    '.k-grid .k-grid-header th { border-top: 1px solid; }' +
                    '.k-grouping-header, .k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
                    // '.k-grid-pager { display: none; }' + // optional: hide the whole pager
                    '</style>' +
                    '</head>' +
                    '<body>';

                var htmlEnd =
                    '</body>' +
                    '</html>';

                var gridHeader = gridElement.children('.k-grid-header');
                if (gridHeader[0]) {
                    var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
                    printableContent = gridElement
                        .clone()
                        .children('.k-grid-header').remove()
                        .end()
                        .children('.k-grid-content')
                        .find('table')
                        .first()
                        .children('tbody').before(thead)
                        .end()
                        .end()
                        .end()
                        .end()[0].outerHTML;
                } else {
                    printableContent = gridElement.clone()[0].outerHTML;
                }

                doc.write(htmlStart + printableContent + htmlEnd);
                doc.close();
                win.print();

            }
               $('#printGrid').click(function () {
                   printGrid();
               });
        </script>

## See Also

* [Excel Export by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/excel-export)
* [Copying to Excel by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/copy-to-excel)
* [PDF Export of the Grid HtmlHelper for {{ site.framework }}]({% slug pdfexport_gridhelper_aspnetcore %})
* [Server-Side API](/api/grid)
