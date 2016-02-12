---
title: Editing
page_title: Editing | ListView JSP Tag
description: "Get started with the editing functionality of the ListView JSP tag in Kendo UI."
slug: editing_listview_uiforjsp
position: 2
---

# Editing

## Getting Started

### Configuration

To configure the Kendo UI ListView for JSP editing, follow the steps below.

**Step 1** Define the `item` template.

###### Example

        <script type="text/x-kendo-tmpl" id="template">
            <div class="product-view">
                <dl>
                    <dt>Product Name</dt>
                    <dd>#=productName#</dd>
                    <dt>Unit Price</dt>
                    <dd>#=kendo.toString(unitPrice, "c")#</dd>
                    <dt>Units In Stock</dt>
                    <dd>#=unitsInStock#</dd>
                    <dt>Discontinued</dt>
                    <dd>#=discontinued#</dd>
                </dl>
                <div class="edit-buttons">
                    <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span>Edit</a>
                    <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span>Delete</a>
                </div>
            </div>
        </script>

> **Important**
>
> Click events for elements with the `k-edit-button` and `k-delete-button` class names are automatically handled and treated by the Kendo UI ListView as `edit` and `delete` actions.

**Step 2** Define the `edit` template.

###### Example

        <script type="text/x-kendo-tmpl" id="editTemplate">
            <div class="product-view">
                <dl>
                    <dt>Product Name</dt>
                    <dd>
                        <input type="text" data-bind="value:productName" name="productName" required="required" validationMessage="required" />
                        <span data-for="productName" class="k-invalid-msg"></span>
                    </dd>
                    <dt>Unit Price</dt>
                    <dd>
                        <input type="text" data-bind="value:unitPrice" data-role="numerictextbox" data-type="number" name="unitPrice" required="required" min="1" validationMessage="required" />
                        <span data-for="unitPrice" class="k-invalid-msg"></span>
                    </dd>
                    <dt>Units In Stock</dt>
                    <dd>
                        <input type="text" data-bind="value:unitsInStock" data-role="numerictextbox" name="unitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
                        <span data-for="unitsInStock" class="k-invalid-msg"></span>
                    </dd>
                    <dt>Discontinued</dt>
                    <dd><input type="checkbox" name="discontinued" data-bind="checked:discontinued"></dd>
                </dl>
                <div class="edit-buttons">
                    <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span>Save</a>
                    <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span>Cancel</a>
                </div>
            </div>
        </script>

> **Important**
>
> Click events for elements with the `k-update-button` and `k-cancel-button` class names are automatically handled and treated by the Kendo UI ListView as `save` and `cancel` actions.

**Step 3** Define the interface for creating new items.

###### Example

        <div class="k-toolbar k-grid-toolbar">
            <a class="k-button k-button-icontext k-add-button" href="#">
                <span class="k-icon k-add"></span>Add new record
            </a>
        </div>

        <script>
            $(function() {
                var listView = $("#listView").data("kendoListView");
                $(".k-add-button").click(function(e) {
                    listView.add();
                    e.preventDefault();
                });
            });
        </script>

**Step 4** Specify the `parameterMap` and the action methods which will handle the `Create`, `Update` and `Destroy` operations.

###### Example

        <kendo:listView name="listView" template="template" pageable="true"
            editTemplate="editTemplate">
            <kendo:dataSource pageSize="4" serverPaging="true">
                <kendo:dataSource-transport>
                    <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                        <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
                        <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                        <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
                        <kendo:dataSource-transport-parameterMap>
                            <script>
                                function parameterMap(options,type) {
                                    return JSON.stringify(options);
                                }
                            </script>
                        </kendo:dataSource-transport-parameterMap>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:listView>

**Step 5** Specify the properties of the model as well as the unique identifier (primary key).

###### Example

        <kendo:listView name="listView" template="template" pageable="true"
            editTemplate="editTemplate">
            <kendo:dataSource pageSize="4" serverPaging="true">
                <kendo:dataSource-transport>
                    <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                        <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
                        <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                        <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                    <kendo:dataSource-schema-model id="productId">
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="productId"
                                editable="false" nullable="true">
                            </kendo:dataSource-schema-model-field>
                            <kendo:dataSource-schema-model-field name="productName">
                            </kendo:dataSource-schema-model-field>
                            <kendo:dataSource-schema-model-field name="unitPrice" type="number">
                            </kendo:dataSource-schema-model-field>
                            <kendo:dataSource-schema-model-field name="discontinued"
                                type="boolean">
                            </kendo:dataSource-schema-model-field>
                            <kendo:dataSource-schema-model-field name="unitsInStock"
                                type="number">
                            </kendo:dataSource-schema-model-field>
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:listView>

**Step 6** Implement the `Read` action method.

###### Example

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/editing/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

            return product.getList(request);
        }

**Step 7** Implement the `Create` action method.

###### Example

        @SuppressWarnings("serial")
        @RequestMapping(value = "/editing/create", method = RequestMethod.POST)
        public @ResponseBody Map<String,Object> create(@RequestBody Map<String, Object> model) {
            final Product target = new Product();

            target.setProductName((String)model.get("productName"));
            target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            target.setUnitsInStock((int)model.get("unitsInStock"));
            target.setDiscontinued((boolean)model.get("discontinued"));

            product.saveOrUpdate(target);

            return new HashMap<String, Object>() \{\{
                put("data", target);
            }};
        }

**Step 8** Implement the `Update` action method.

###### Example

        @RequestMapping(value = "/editing/update", method = RequestMethod.POST)
        public @ResponseBody Product update(@RequestBody Map<String, Object> model) {
            Product target = new Product();

            target.setProductId((int)model.get("productId"));
            target.setProductName((String)model.get("productName"));
            target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
            target.setUnitsInStock((int)model.get("unitsInStock"));
            target.setDiscontinued((boolean)model.get("discontinued"));

            product.saveOrUpdate(target);

            return target;
        }

**Step 9** Implement the `Destroy` action method.

###### Example

        @RequestMapping(value = "/editing/destroy", method = RequestMethod.POST)
        public @ResponseBody Product destroy(@RequestBody Map<String, Object> model) {
            Product target = new Product();

            target.setProductId((int)model.get("productId"));

            product.delete(target);

            return target;
        }

## See Also

Other articles on Telerik UI for JSP and on the ListView:

* [Overview of the ListView JSP Tag]({% slug overview_listview_uiforjsp %})
* [Ajax Binding of the ListView]({% slug ajaxbinding_listview_uiforjsp %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
