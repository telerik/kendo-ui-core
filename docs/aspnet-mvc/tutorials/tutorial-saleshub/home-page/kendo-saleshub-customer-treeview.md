---
title: Create the Customer TreeView
page_title: Create the Customer TreeView | Kendo UI Sales Hub Tutorial
description: "Learn how to create the customer TreeView in the Kendo UI Sales Hub project by using Telerik UI for ASP.NET MVC."
previous_url: /tutorials/asp.net/saleshub/home-page/kendo-saleshub-customer-treeview
slug: createcustomtreeview_saleshubtutorial_aspnetmvc
position: 1
---

# Create the Customer TreeView

**Figure 1. The Kendo UI Sales Hub customer TreeView**

![kendo-saleshub-customer-TreeView-screenshot](/aspnet-mvc/tutorial-saleshub/home-page/images/kendo-saleshub-customer-treeview-screenshot.png)

This article demonstrates how to create a [Kendo TreeView](http://demos.telerik.com/kendo-ui/web/treeview/index.html) on the server side.

In the Sales Hub application, a [Kendo TreeView](http://demos.telerik.com/kendo-ui/web/treeview/index.html) is used to display all customers of a selling company. The Selling Company appears as a root node in the TreeView and the Customers for each Selling Company are grouped by the region in which the customer is located. So, the basic structure of the TreeView is: **Selling Company** > **Region** > **Customer Name**.

When a Customer is selected in the [Kendo TreeView](http://demos.telerik.com/kendo-ui/web/treeview/index.html), the **Orders** grid is updated to display only the Orders for the selected Customer. If you want to learn how the **Orders** grid is updated depending on the selected Customer, refer to the article on [filtering orders on the server side]({% slug filterordersonserver_saleshubtutorial_aspnetmvc %}).

The Customer TreeView is located in `Views/Home/Index.cshtml`.

## Configuration

### Customer TreeView Setup

To generate the Customer TreeView, use the Razor code demonstrated in the example below.

###### Example

    @using Kendo.Mvc.UI
    @model SalesHub.Client.ViewModels.Client.IndexViewModel
    @functions
    {
        public static Dictionary<string, object> BuildAttributesForItem(SellingCompanyTreeViewItem item)
        {
            var attributes = new Dictionary<string, object>();

            if (item.CustomerId.HasValue)
            {
                attributes.Add("data-customer-id", item.CustomerId.Value.ToString());
            }
            return attributes;
        }
    }

    @(Html.Kendo().TreeView().Name("customerTreeView").BindTo(Model.TreeViewRoot.Items, binding => binding
        .For<SellingCompanyTreeViewItem>(mapping => mapping
            .Children(sellingCompanyTreeViewItem => sellingCompanyTreeViewItem.Items)
            .ItemDataBound((item, sellingCompanyTreeViewItem) => {
                item.Text = sellingCompanyTreeViewItem.Text;
                item.Expanded = sellingCompanyTreeViewItem.Expanded;

                var attributes = BuildAttributesForItem(sellingCompanyTreeViewItem);
                foreach (var attr in attributes)
                {
                    item.HtmlAttributes.Add(attr);
                }
            })
        ))
        .Events(events => events.Select("window.SalesHub.CustomerTreeView_Select")))

### Code Breakdown

Below is the breakdown of the code from the example above.

###### Example

    @using Kendo.Mvc.UI

To use the Kendo UI MVC extensions, first include the namespace for the extensions in your View. This makes the `Kendo()` extension method available and allows the creation of Kendo UI widgets.

###### Example

    @functions
    {
        public static Dictionary<string, object> BuildAttributesForItem(SellingCompanyTreeViewItem item)
        { // Code... }
    }

Before you create your TreeView, set up a helper function that generates a Dictionary of HTML data attributes and their corresponding value. This helper function will be used when the TreeView is bound. These HTML data attributes will eventually be used by your custom client-side code.

###### Example

    @Html.Kendo().TreeView().Name("customerTreeView")

Here, the `Kendo()` extension method is used to tell the Kendo UI MVC extensions that you want it to create a Kendo UI TreeView with `customerTreeView` as its `Name`. When using the Kendo UI MVC extensions, the name of a Kendo UI widget is the `id` of the HTML element that the extensions generate.

Just telling the extensions to generate a TreeView itself is not all that useful. You must tell it what data should be bound against the TreeView. With the extensions you can either tell the TreeView to bind against a remote data-service or have it generate the complete markup for the tree server-side. In this case, you have it generate the markup server-side using the `BindTo` function on a TreeView.

###### Example

    .BindTo(Model.TreeViewRoot.Items, binding => { // Our custom binding })

Since you already know what data is to be displayed in the TreeView, take advantage of the `BindTo` function. The `BindTo` function takes two parameters&mdash;the first one is the `Enumerable` that is intended to bind the tree against, and the second one is an `Action` that takes a `NavigationBindingFactory` object as its parameter.

###### Example

    .BindTo(Model.TreeViewRoot.Items,binding =>
        binding.For<SellingCompanyTreeViewItem>(mapping => { // Code to map our SellingCompanyTreeViewItem to a Kendo TreeViewItem. })

Use this binding factory to iterate over the objects in the `Enumerable` that you supplied to the `BindTo` function by calling its `For` function. The generic type given to this function has to be the same type as the objects which are in the `Enumerable` that you gave to the `BindTo` function. In this case, the `Enumerable` is a list of `SellingCompanyTreeViewItems`. The `For` function takes an `Action&lt;NavigationBindingBuilder&gt;` as a parameter.

###### Example

    binding.For<SellingCompanyTreeViewItem>(mapping => mapping
        .Children(sellingCompanyTreeViewItem => sellingCompanyTreeViewItem.Items)
        .ItemDataBound((item, sellingCompanyTreeViewItem) => {
            item.Text = sellingCompanyTreeViewItem.Text;
            item.Expanded = sellingCompanyTreeViewItem.Expanded;

            var attributes = BuildAttributesForItem(sellingCompanyTreeViewItem);
            foreach (var attr in attributes)
            {
                item.HtmlAttributes.Add(attr);
            }
        })

The examples use the `mapping` object to tell Kendo UI what property to use on the `SellingCompanyTreeViewItem` when it tries to render the children of that `SellingCompanyTreeViewItem` and it gives it a function to call every time a Kendo UI TreeViewItem is bound to the TreeView.

###### Example

    .Children(sellingCompanyTreeViewItem => sellingCompanyTreeViewItem.Items)

This is how you tell it where to look for children nodes when it is rendering the TreeView.

###### Example

    .ItemDataBound((item, sellingCompanyTreeViewItem) => {
        item.Text = sellingCompanyTreeViewItem.Text;
        item.Expanded = sellingCompanyTreeViewItem.Expanded;

        var attributes = BuildAttributesForItem(sellingCompanyTreeViewItem);
        foreach (var attr in attributes)
        {
            item.HtmlAttributes.Add(attr);
        }
    })

The function given to `ItemDataBound` is called every time that a Kendo UI `TreeViewItem` is bound to the TreeView. The callback function takes two parameters. The first one is the Kendo UI `TreeViewItem` that is being bound to the TreeView, and the second one is the `SellingCompanyTreeViewItem` that corresponds to that Kendo UI TreeViewItem. This is the point where you set the `Text` and the `Expanded` state of the resulting `TreeViewItem`.

This is also the point where you call your Razor helper function to generate some HTML data attributes for the items in the TreeView.

###### Example

    .Events(events => events.Select("window.SalesHub.CustomerTreeView_Select"))

Since you want to update the **Orders** grid depending on the selected Customer, attach an event handler for the `Select` event of
the TreeView.

For more information on how to handle the `Select` event from the TreeView, refer to the article on [filtering orders on the server side]({% slug filterordersonserver_saleshubtutorial_aspnetmvc %}).

If you inspect the resulting HTML markup using your browsers Developer Tools, notice that a `<script>` tag is created and placed after the markup for the TreeView. This script tag is generated by the Kendo UI MVC extensions and contains JavaScript, which runs automatically when the page is loaded, that turns the markup into an actual Kendo UI TreeView.

The contents of the script tag should look similar to the script in the example below.

###### Example

    jQuery(function(){jQuery("#customerTreeView").kendoTreeView({"select":window.SalesHub.CustomerTreeView_Select});});

The JavaScript generated by the extensions looks for the generated markup based on an `id`. The `id` it looks for is the same as the `Name` that you gave the Kendo UI TreeView when you declared it. After it finds the element, it turns it into a TreeView by calling `kendoTreeView` on it.

## See Also

Other articles on the Kendo UI Sales Hub project and its Home and Order pages:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_saleshubtutorial_aspnetmvc %})
* [Create the Orders Grid]({% slug createordersgrid_saleshubtutorial_aspnetmvc %})
* [Filter Orders on the Server]({% slug filterordersonserver_saleshubtutorial_aspnetmvc %})
* [Create and Edit Orders]({% slug createeditorders_saleshubtutorial_aspnetmvc %})
* [Handle Order Details]({% slug handleorderdetails_saleshubtutorial_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_saleshubtutorial_aspnetmvc %})
