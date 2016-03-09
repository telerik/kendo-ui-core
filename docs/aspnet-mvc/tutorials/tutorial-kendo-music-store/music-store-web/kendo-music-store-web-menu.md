---
title: Create the Main Menu
page_title: Create the Main Menu | Music Store Web App Tutorial
description: "Learn how to create the main menu page in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createthemainmenu_muscistorewebapp_aspnetmvc
position: 2
---

# Create the Main Menu

**Figure 1. Overview of the main menu**

![kendo-menu-overview](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-menu-overview.png)

The main menu of the Music Store application features some of the [Kendo UI Menu widget functionalities](http://demos.telerik.com/kendo-ui/web/menu/index.html) and consists of the items listed below:

* The **Genres** item uses a pull-down menu of items to show all the genres of music in the store.
* The **About** item displays static content within a panel that opens the menu below.
* The **Contact** item works as a hyperlink or button that navigates on when clicked, instead of displaying a sub-menu.

## Configuration

### Create the Main Menu

The examples use the Kendo UI Menu widget to add a navigation menu to the Music Store. Define the menu items as a `<ul>` with HTML and Razor, as demonstrated in the example below.

###### Example

    <ul id="menu">
        <li>Genres</li>
        <li>About</li>
        <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
    </ul>

Add JavaScript to convert this to a Kendo UI Menu.

###### Example

    $(document).ready(function () {
        $("#menu").kendoMenu();
    });

This uses a jQuery selector to get your `<ul>` tag with the id `menu`, then turns it into a Kendo UI Menu. This type of Kendo UI usage is sometimes called explicit widget initialization, since the element is directly targeted in JavaScript. You are going to see examples of implicit initialization, `data-` attributes, and the MVVM pattern later on. However, the examples of the first application control aim at being simple.

### Add the Genres Pull-Down Menu

The next step is to convert the **Genres** list to a pull-down menu. Any `<li>` element that in turn contains another list `<ul>` element is treated as a pull-down item. Start with an empty pull-down menu item for the **Genres**.

###### Example

    <li>Genres
        <ul>
            <li>placeholder 1</li>
            <li>placeholder 2</li>
        </ul>
    </li>

The code from the example above creates the pull-down item.

**Figure 2. Overview of the pull-down Genres menu item**

![kendo-menu-pulldown-placeholder](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-menu-pulldown-placeholder.png)

You can replace your placeholder `<li>` elements with an MVC partial that loads the list of **Genres**.

###### Example

    <li>Genres
        <ul>
            @{Html.RenderAction("GenreMenu", "Store");}
        </ul>
    </li>

This partial outputs a list of `<li>` elements that work as links to each Genre.

###### Example

    @model IEnumerable<MvcMusicStore.Models.Genre>

    <ul>
        @foreach (var genre in Model)
        {
            <li>@Html.ActionLink(genre.Name,
                    "Browse", "Store",
                    new { Genre = genre.Name }, null)
            </li>
        }
    </ul>

### Add the About Pull-Down Menu

The Kendo UI Menu control allows adding any content to a drop-down menu item. It does not have to be a list of selectable items like the **Genres**. To add content to a menu item, include a `<ul>` element with a single `<li>` element. Within that element, use a `<div>` to specify the content.

The example below demonstrates how to add this content for the **About** menu item.

###### Example

    <li>About
        <ul>
            <li>
                <div class="k-content menu-content">
                    <img src="~/Images/kendo-logo.png" />
                    <p>Try Kendo UI yourself in the interactive Kendo UI Dojo!</p>
                    <p><a href="http://trykendoui.telerik.com" target="_blank">Launch Kendo UI Dojo</a></p>
                </div>
            </li>
        </ul>
    </li>

<!--_-->
This creates the `<div>` content displayed in a drop-down menu item, as shown in the figure below.

**Figure 3. The Kendo UI pull-down content in a drop-down menu item**

![kendo-menu-pulldown-content](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-menu-pulldown-content.png)

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
