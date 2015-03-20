---
title: Basic Usage
page_title: Using Kendo UI ListView widget in your app | Kendo UI Documentation
previous_url: /howto/howto-use-the-listview-of-kendo-ui-web
description: Learn how to display a custom layout of data-bound items through templates and easily implement Kendo UI Listview widget in your application.
position: 2
---

#  Use the Web ListView

The ListView purpose is to display a custom layout of data-bound items through templates. The ListView is ideally suited for scenarios where you wish
to display a list of items in a consistent manner. Examples of its use can be seen in commonplace design structures applied on the Internet today;
search engine results, tweets from Twitter, Facebook updates, inbox items in Gmail, card lists in Trello, and so on.

The ListView is designed to put you back in control when it comes to displaying data. In fact, it does not provide a default rendering of data-bound
items. Instead, it relies entirely on templates to define how a list of items - including alternating items and items being edited - is displayed.

Let's see how the ListView works by building a simple example.

First, we'll define a target HTML element such as a list or div:

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <img src="http://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

> Please note that the ListView item template must have only one root element - in this case this is `div.product`.

Next, we'll initialize the ListView by referring the template and a result set from the service to be displayed:

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Products",
                dataType: "jsonp"
            }
        }
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
    });

Here's the live example of the representation (above):

<iframe style="width: 700px; height: 450px" src="http://jsfiddle.net/3w7ru/90/embedded/result" frameborder="0"></iframe>

In scenarios where the number of items bound to a ListView is larger than expected, a Pager will control the items being displayed. Using a Pager is relatively simple. First, you create a target element for its rendering. Typically, it should be placed in the vicinity of the ListView:

    <div id="listView"></div>
    <div class="k-page-wrap">
        <div id="pager"></div>
    </div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <img src="http://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

The next step is to update the ListView configuration to state that it support paging through its pageable property and to initialize the Pager:

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Products",
                dataType: "jsonp"
            }
        },
        pageSize: 4
    });

    $("pager").kendoPager({
        dataSource: dataSource
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        pageable: true,
        template: kendo.template($("#template").html())
    });

Here's the same live example with a Pager applied to the ListView:

<iframe style="width: 700px; height: 450px" src="http://jsfiddle.net/3w7ru/92/embedded/result" frameborder="0"></iframe>

From a design perspective, it may be useful to visually differiante each alternating item in a ListView. For example, in the previous example, I may wish to have every second item have a slightly darker background (i.e. banded rows). Defining the altTemplate property accomplishes this through the use of a template that you define. Let's go ahead and update our working example to include a template for alternating items.

    <div id="listView"></div>
    <div class="k-page-wrap">
        <div id="pager"></div>
    </div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <img src="http://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="altTemplate">
        <div class="product alt">
            <img src="http://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

Here's how the live example how looks with a template for alternating items:

<iframe style="width: 750px; height: 450px" src="http://jsfiddle.net/3w7ru/94/embedded/result" frameborder="0"></iframe>

In addition to paging, the ListView supports item selection, navigation, and inline editing. Supporting these operations is achieved through the initialization of its Boolean configuration options. In the case of inline editing, the ListView provides the editTemplate property, which defines a template for this mode. Once define, the ListView can render out this editing template via the edit method. When invoked, the editTemplate for the ListView is applied against the target item. In most scenarios, you should implement this through an event model that is triggered when the user selected an item to modify.

The ListView encapsulates operations for adding and removing items, item selection and editing. These methods enable you to modify the underpinning list of items through a series of user-initiated actions/events. In the case of inline editing, the first step is to define a template that is to be used when editing items.

    <script type="text/x-kendo-tmpl" id="editTemplate">
        <div class="product-view k-widget">
            <div class="edit-buttons">
                <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
                <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
            </div>
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
        </div>
    </script>

    $(document).ready(function(){
        $("#listView").kendoListView({
            selectable: true,
            navigatable: true,
            template: kendo.template($("#template").html()),
            editTemplate: kendo.template($("#editTemplate").html())
        });
    });

The template you define for the inline editing of items may include other Kendo UI widgets. Looking at [the example for editing items on
KendoUI.com](http://demos.telerik.com/kendo-ui/web/listview/editing.html), you can see that the edit template defines a series of widgets for editing
an item:

![ListView Item Editing](/images/listview-item-editing.png)

The add new record functionality of ListView items is triggered by a click event initiated by a user and is wired up via .click() in jQuery.

    $(".k-add-button").click(function(e) {
        listView.add();
        e.preventDefault();
    });

Item selection is another scenario supported by the ListView. By setting the selectable property to either "single" or "multiple", you can provide the ability to have users select items.

    $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "multiple",
        template: kendo.template($("#template").html())
    });

You can capture when items are selected through the change event that is triggered when a user selected one or more items (via shift-select).

    $("#listView").kendoListView({
        change: function(e) {
            var data = dataSource.view();
            var selected = $.map(this.select(), function(item) {
                return data[$(item).index()].ProductName;
            });

            // index selected or read item information through data
        }
    });

Updating the example that I created before, here's the live representation of that with item selection enabled:

<iframe style="width: 700px; height: 450px" src="http://jsfiddle.net/3w7ru/95/embedded/result" frameborder="0"></iframe>
