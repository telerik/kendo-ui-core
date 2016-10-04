---
title: Update ListView on DataSource Item Update
page_title: Update ListView on DataSource Item Update | Kendo UI ListView
description: "Learn how to filter the ListView datasource based on Kendo UI Slider selection."
slug: howto_updatelistviewondatasitemupdate_listview
---

# Update ListView on DataSource Item Update

The Kendo UI ListView does not update the content dynamically on model field update. To re-render the widget, trigger the `change` event of the dataSource manually after the model update.

The example below demonstrates how to update the ListView on a dataSource item update.

###### Example

```html
    <base href="http://demos.telerik.com/kendo-ui/listview/mvvm">

    <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <title></title>

    <script src="//kendo.cdn.telerik.com/2015.3.1111/js/jquery.min.js"></script>
    <script src="//kendo.cdn.telerik.com/2015.3.1111/js/kendo.all.min.js"></script>
    <script src="../content/shared/js/console.js"></script>

    <div id="example">
        <div class="demo-section k-content wide">
            <fieldset>
              <dd>
                ProductName (first data item):
              </dd>
              <dt>
                <input data-bind="value: newProductName" />
                <button data-bind="click: updateValue">Set</button>
              </dt>
            </fieldset>
            <div>
            <h4>Update a record</h4>
            <div data-role="listview"
                 data-edit-template="edit-template"
                 data-template="template"
                 data-bind="source: products,
                            visible: isVisible,
                            events: {
                              save: onSave
                            }"
                 style="height: 300px; overflow: auto"></div>
        </div>
        <div style="padding-top: 2em;">
            <h4>Console</h4>
            <div class="console"></div>
        </div>
    </div>
    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
                <dt>Unit Price</dt>
                <dd>#:kendo.toString(UnitPrice, "c")#</dd>
                <dt>Units In Stock</dt>
                <dd>#:UnitsInStock#</dd>
                <dt>Discontinued</dt>
                <dd>#:Discontinued#</dd>
            </dl>
            <div class="edit-buttons">
                <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>
                <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
            </div>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="edit-template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>
                    <input type="text" class="k-textbox" data-bind="value:ProductName" name="ProductName" required="required" validationMessage="required" />
                    <span data-for="ProductName" class="k-invalid-msg"></span>
                </dd>
                <dt>Unit Price</dt>
                <dd>
                    <input type="text" data-bind="value:UnitPrice" data-role="numerictextbox" data-type="number" name="UnitPrice" required="required" min="1" validationMessage="required" />
                    <span data-for="UnitPrice" class="k-invalid-msg"></span>
                </dd>
                <dt>Units In Stock</dt>
                <dd>
                    <input type="text" data-bind="value:UnitsInStock" data-role="numerictextbox" name="UnitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
                    <span data-for="UnitsInStock" class="k-invalid-msg"></span>
                </dd>
                <dt>Discontinued</dt>
                <dd><input type="checkbox" name="Discontinued" data-bind="checked:Discontinued"></dd>
            </dl>
            <div class="edit-buttons">
                <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
                <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
            </div>
        </div>
    </script>
    <div class="box wide">
        <div class="box-col">
            <h4>Configuration</h4>
            <div>
                <label><input type="checkbox" data-bind="checked: isVisible">Visible</label>
            </div>
        </div>
        <div class="box-col">
            <h4>Information</h4>
            Kendo UI ListView supports the
            <a href="http://docs.telerik.com/kendo-ui/getting-started/framework/mvvm/bindings/events">events</a>,
            <a href="http://docs.telerik.com/kendo-ui/getting-started/framework/mvvm/bindings/source">source</a> and
            <a href="http://docs.telerik.com/kendo-ui/getting-started/framework/mvvm/bindings/visible">visible</a> bindings.
        </div>
    </div>
    <script>
        var viewModel = kendo.observable({
          	newProductName: "test",
          	updateValue: function() {
              	this.products.at(0).set("ProductName", this.newProductName);
              	this.products.trigger("change");
            },
            isVisible: true,
            onSave: function(e) {
            $(".console").append("<p>" + "event :: save(" + kendo.stringify(e.model, null, 4) + ")" + "</p>");
            },
            products: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "ProductID"
                    }
                },
                batch: true,
                transport: {
                    read: {
                        url: "//demos.telerik.com/kendo-ui/service/products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: "//demos.telerik.com/kendo-ui/service/products/update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: "//demos.telerik.com/kendo-ui/service/products/create",
                        dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                }
            })
        });
        kendo.bind($("#example"), viewModel);
    </script>
    <style>
        .product-view
        {
            float: left;
            width: 50%;
            height: 300px;
            box-sizing: border-box;
            border-top: 0;
            position: relative;
        }
        .product-view:nth-child(even) {
            border-left-width: 0;
        }
        .product-view dl
        {
            margin: 10px 10px 0;
            padding: 0;
            overflow: hidden;
        }
        .product-view dt, dd
        {
            margin: 0;
            padding: 0;
            width: 100%;
            line-height: 24px;
            font-size: 18px;
        }
        .product-view dt
        {
            font-size: 11px;
            height: 16px;
            line-height: 16px;
            text-transform: uppercase;
            opacity: 0.5;
        }

        .product-view dd
        {
            height: 46px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

        }

        .product-view dd .k-widget,
        .product-view dd .k-textbox {
            font-size: 14px;
        }
        .k-listview
        {
            border-width: 1px 1px 1px 0;
            padding: 0;
            overflow: hidden;
            min-height: 298px;
        }
        .edit-buttons
        {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: right;
            padding: 5px;
            background-color: rgba(0,0,0,0.1);
        }
        span.k-invalid-msg
        {
            position: absolute;
            margin-left: 6px;
        }

        .k-add-button {
            margin-bottom: 2em;
        }

        @media only screen and (max-width : 620px) {

            .product-view
            {
                width: 100%;
            }
            .product-view:nth-child(even) {
                border-left-width: 1px;
            }
        }
    </style>
    </div>
```

## See Also

Other articles and how-to examples on the Kendo UI ListView:

* [ListView JavaScript API Reference](/api/javascript/ui/listview)
* [How to Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})

For more runnable examples on Kendo UI ListView, browse the [**How To** documentation folder]({% slug add_custom_delete_confirmation_dialog %}).
