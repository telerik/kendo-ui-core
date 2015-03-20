---
title: Create the Main Menu
position: 2
---

# Create the Main Menu - Kendo UI Music Store

![kendo-menu-overview](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-menu-overview.png)

The main menu of the Music Store application shows off some of the functionality of the [Kendo UI Menu Widget](http://demos.telerik.com/kendo-ui/web/menu/index.html).
The **Genres** item uses a pull-down menu of items to show all the genres of music in the store.
The **About** item displays some static content within a panel that opens below the menu.
The **Contact** item works like a hyperlink or button and navigates when clicked on, instead of displaying a sub-menu.

## Add the Main Menu

Let's use the Kendo UI Menu control to add a navigation menu to the Music Store.
To start, we can define the menu items as a **&lt;ul&gt;** with HTML and Razor:

    <ul id="menu">
        <li>Genres</li>
        <li>About</li>
        <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
    </ul>

Converting this to a Kendo UI menu is easy. We just add the JavaScript:

    $(document).ready(function () {
        $("#menu").kendoMenu();
    });

This uses a jQuery selector to get our **&lt;ul&gt;** tag with the id "menu," then turns it into a Kendo UI menu.
This type of Kendo UI usage is sometimes called "explicit" widget initialization, since the element is directly targeted in JavaScript (we will see examples of implicit initialization, **data-** attributes, and the MVVM pattern later on, but let's keep it simple for our first control.)

## Add the Genres pull-down menu

Next we move the Genres list into a pull-down menu.
Any **&lt;li&gt;** elements that in turn contain another list **&lt;ul&gt;** element are treated as a pull-down item.Let's start with an empty pull-down menu item for our Genres:

    <li>Genres
        <ul>
            <li>placeholder 1</li>
            <li>placeholder 2</li>
        </ul>
    </li>

This creates the pull-down item:

![kendo-menu-pulldown-placeholder](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-menu-pulldown-placeholder.png)

We can replace our "placeholder" **&lt;li&gt;** elements with an MVC partial that loads the list of Genres:

    <li>Genres
        <ul>
            @{Html.RenderAction("GenreMenu", "Store");}
        </ul>
    </li>

This partial outputs a list of **&lt;li&gt;** elements that work as links to each Genre:

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

## Add the About pull-down menu

Another ability of the Kendo UI Menu control is adding any content into a dropdown menu item.
It does not have to be a list of selectable items, like the Genres.
To add content to a menu item, include a **&lt;ul&gt;** element with a single **&lt;li&gt;** element.
Within that element, use a **&lt;div&gt;** to specify the content.
For example, let's add this content for our "About" menu item:

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

This creates the **&lt;div&gt;** content displayed in a dropdown menu item:

![kendo-menu-pulldown-content](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-menu-pulldown-content.png)
