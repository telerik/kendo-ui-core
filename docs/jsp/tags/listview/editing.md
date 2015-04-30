---
title: Editing
---

# Editing

## Getting started

To configure Kendo ListView for JSP for editing follow these steps:

1.  Define item template:

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

    **Note:** Click events for elements with class name **k-edit-button** and **k-delete-button** will be automatically handled and treated by Kendo ListView as **edit** and **delete** actions.

2.  Define edit template:

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

    **Note:** Click events for elements with class name **k-update-button** and **k-cancel-button** will be automatically handled and treated by Kendo ListView as **save** and **cancel** actions.

3.  Define the interface for creating new items:

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

4.  Specify the parameterMap and the action methods which will handle the Create, Update and Destroy operations:

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


5.  Specify the properties of the model as well as the unique identifier (primary key):

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

6.  Implement the `Read` action method:

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/editing/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

            return product.getList(request);
        }

7.  Implement the `Create` action method:

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

8.  Implement the `Update` action method:

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

9.  Implement the `Destroy` action method:

        @RequestMapping(value = "/editing/destroy", method = RequestMethod.POST)
        public @ResponseBody Product destroy(@RequestBody Map<String, Object> model) {
            Product target = new Product();

            target.setProductId((int)model.get("productId"));

            product.delete(target);

            return target;
        }
