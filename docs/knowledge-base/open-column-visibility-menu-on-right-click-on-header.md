---
title: Open column visibility menu on right on column header
description: Learn how to customize the Kendo Grid by adding custom menu that opens on right click of the column header.
type: how-to
page_title: Open column visibility menu on right on column header | Kendo UI Grid
slug: open-column-visibility-menu-on-right-click-on-header
tags: grid, right-click, hide,show,columns
ticketid: 
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I create a popup menu for toggling columns visibility that opens on right click of the column header?

## Solution

```       
        <div id="example">
            <div id="grid"></div>

            <script>


            function toggleMenu(e){
                e.preventDefault(); 

                var popup =	$('#checkboxes').data('kendoPopup');
                popup.open();

                $('.k-animation-container').css("top", e.clientY).css('left',e.clientX )

            }

            function addColumnsToPopup(grid){

                var container = $('#checkboxes');

                if (container.is(':empty')) {

                grid.columns.map(function(x,y){
                    return {title: x.title? x.title:x.field, field: x.field}
                }).forEach(function(x,y) {

                    var div = $('<div/>');	
                    var label = $('<label/>')
                    var checkbox = $('<input type="checkbox" checked>')

                    label.text(x.title);
                    label.prepend(checkbox);
                    checkbox.attr('data-index', y)
                    div.append(label)

                    checkbox.on('change', function(e){

                    var grid =   $("#grid").data('kendoGrid');

                    if(e.target.checked) {
                        grid.showColumn(+$(e.target).attr('data-index'))
                    } else {
                        grid.hideColumn(+$(e.target).attr('data-index'))
                    }

                    }) 
                    container.append(div);
                });          
                }
            }

            function createPopup(){
                var popup =	$('#checkboxes').data('kendoPopup');

                if (typeof popup === "undefined") {       
                $('#checkboxes').kendoPopup({
                    animation: {
                    close: {
                        effects: "fadeOut zoom:out",
                        duration: 300
                    },
                    open: {
                        effects: "fadeIn zoom:in",
                        duration: 300
                    }
                    }
                })
                }
            }



            $(document).ready(function() {

                $('body').on('click',function(e){
                if($('#checkboxes').has(e.target).length <= 0){

                    $('#checkboxes').data('kendoPopup').close()
                }
                })

                $("#grid").kendoGrid({
                dataBound: function(e) {
                    e.sender.element.find('th').on('contextmenu',toggleMenu)
                    addColumnsToPopup(this);
                    createPopup()

                },
                dataSource: {
                    type: "odata",
                    transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                    model: {
                        fields: {
                        OrderID: { type: "number" },
                        ShipCountry: { type: "string" },
                        ShipName: { type: "string" },
                        ShipAddress: { type: "string" }                                        
                        }
                    }
                    },
                    pageSize: 30,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                },
                height: 550,
                sortable: true,
                filterable: true,
                pageable: true,
                columns: [ {
                    field: "OrderID",
                    title: "Order ID",
                    width: 120
                }, {
                    field: "ShipCountry",
                    title: "Ship Country"
                }, {
                    field: "ShipName",
                    title: "Ship Name"
                },  {
                    field: "ShipAddress",
                    filterable: false
                }
                            ]
                });
            });
            </script>

            <div id="checkboxes"></div>

        </div>

        <style>
            #checkboxes div{
            padding:5px 10px;
            }

            #checkboxes label:hover {
            cursor:pointer;
            }

        </style>
```
