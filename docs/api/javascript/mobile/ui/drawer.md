---
title: Drawer
page_title: Configuration, methods and events of Kendo UI Mobile Drawer
description: Set direction of the Kendo UI Mobile Drawer container, use methods to show and hide it.
---

# kendo.mobile.ui.Drawer

Represents the Kendo UI Mobile Drawer widget. Inherits from [kendo.mobile.ui.View](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### container `jQuery`

Specifies the content element to shift when the drawer appears. Required if the drawer is used outside of a mobile application.

#### Drawer outside of a mobile application
    <div id="drawer">
        <h3>Sports</h3>
        <a href="#" data-target="baseball" class="drawer-link active">Baseball</a>
        <a href="#" data-target="golf" class="drawer-link">Golf</a>
    </div>

    <div id="content-container">
        <a id="drawer-trigger" href="#"><span>Show drawer</span></a>
        <div id="baseball" class="inner-content">
            <h3>Baseball</h3>
        </div>
        <div id="golf" class="inner-content">
            <h3>Golf</h3>
        </div>
    </div>

    <script>
        $(function() {
            $("#drawer").kendoMobileDrawer({
                container: "#content-container"
            });

            $("#drawer-trigger").click(function() {
                $("#drawer").data("kendoMobileDrawer").show();
                return false;
            });

            $(".drawer-link").click(function() {
                $("#drawer").data("kendoMobileDrawer").hide();
                $(".drawer-link").removeClass("active");
                $(this).addClass("active");
                return false;
            });

            $(".drawer-link").click(function(){
                  $(".inner-content").hide();
                  $("#"+$(this).data("target")).show();
            });
        });
    </script>

### position `String` *(default: 'left')*

The position of the drawer. Can be `left` (default) or `right`.

#### Right positioned drawer

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="my-drawer" data-position="right">
        Hi!
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### swipeToOpen `Boolean` *(default: true)*

If set to `false`, swiping the view will not activate the drawer. In this case, the drawer will only be open by a designated button

### swipeToOpenViews `Array`

A list of the view ids on which the drawer will appear when the view is swiped. If omitted, the swipe gesture will work on all views.
The option has effect only if `swipeToOpen` is set to `true`.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
        <a href="#bar" data-role="button">Go to bar</a>
    </div>

    <div data-role="view" id="bar">
        Drawer will not be revealed when the view is swiped
        <a href="#drawer-settings" data-role="button">Back to settings</a>
    </div>

    <div data-role="drawer" id="my-drawer" data-swipe-to-open-views='["drawer-settings"]'>
        Hi!
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

#### Drawer with swipe to open set to false

    <div data-role="view">
        <a href="#foo" data-rel="drawer" data-role="button">Drawer</a>
    </div>

    <div data-role="drawer" id="foo" data-swipe-to-open="false">
        <div data-role="header">
            <div data-role="navbar">
                <span data-role="view-title">Hello World!</span>
            </div>
        </div>

        <ul data-role="listview">
            <li>Foo</li>
        </ul>

        <div data-role="footer">
           <div data-role="navbar">
               <a data-align="right" data-role="button">Details</a>
           </div>
        </div>
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### title `String`

The text to display in the Navbar title (if present).

### views `Array`

A list of the view ids on which the drawer will appear. If omitted, the drawer will work on any view in the application.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
        <a href="#bar" data-role="button">Go to bar</a>
    </div>

    <div data-role="view" id="bar">
        Drawer will not work here
        <a href="#drawer-settings" data-role="button">Back to settings</a>
    </div>

    <div data-role="drawer" id="my-drawer" data-views='["drawer-settings"]'>
        Hi!
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

## Methods

### destroy

Prepares the **Drawer** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Drawer element from DOM.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
        <a data-role="button" data-click="destroyDrawer">Destroy Drawer</a>
    </div>

    <div data-role="drawer" id="my-drawer">
        Hi!
    </div>

    <script>
    new kendo.mobile.Application();
    function destroyDrawer() {
        $("#my-drawer").data("kendoMobileDrawer").destroy();
    }
    </script>

### hide

Hide the Drawer

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="my-drawer">
        Hi!
        <a data-click="hideDrawer" data-role="button">Hide me</a>
    </div>

    <script>
    new kendo.mobile.Application();
    function hideDrawer() {
        $("#my-drawer").data("kendoMobileDrawer").hide();
    }
    </script>

### show

Show the Drawer

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
        <a data-click="showDrawer" data-role="button">Show drawer</a>
    </div>

    <div data-role="drawer" id="my-drawer">
        Hi!
    </div>

    <script>
    new kendo.mobile.Application();

    function showDrawer() {
        $("#my-drawer").data("kendoMobileDrawer").show();
    }
    </script>


## Events

### afterHide

Fired after the mobile Drawer has been hidden.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="foo" data-after-hide="onAfterHide">
        Foo
    </div>

    <script>
    new kendo.mobile.Application();

    function onAfterHide(e) {
        console.log(e);
    }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.

### beforeShow

Fires before the mobile Drawer is revealed. The event can be prevented by calling the `preventDefault` method of the event parameter.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" data-before-show="prevent">
        I will not be displayed
    </div>

    <script>
    new kendo.mobile.Application();

    function prevent(e) {
        e.preventDefault();
    }
    </script>

### hide

Fired when the mobile Drawer is closed by the user.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="foo" data-hide="onHide">
        Foo
    </div>

    <script>
    new kendo.mobile.Application();

    function onHide(e) {
        console.log(e);
    }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.

### init

Fired when the mobile Drawer and its child widgets are initialized.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="foo" data-init="onInit">
        Foo
    </div>

    <script>
    new kendo.mobile.Application();

    function onInit(e) {
        console.log(e);
    }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.

### show

Fires when the Drawer is shown.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="foo" data-show="onShow">
        Foo
    </div>

    <script>
    new kendo.mobile.Application();

    function onShow(e) {
        console.log(e);
    }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.

## Fields

### visible `Boolean`

Holds information about the current state of the Drawer. If it is currenlty opened then the visible field will be set to true.

#### Example - get the current Drawer state

    <div data-role="view" id="drawer-settings" data-show="onShow">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="my-drawer">
        Hi!
    </div>

    <script>
    new kendo.mobile.Application();
    function onShow(){
        var isVisible = $('#my-drawer').getKendoMobileDrawer().visible;
        console.log(isVisible); //will output false
    }
    </script>
