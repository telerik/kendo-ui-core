---
title: Scroller
page_title: Configuration, methods and events of Kendo UI Mobile Scroller
description: How to configure a mobile scroller in Kendo UI HTML5 mobile framework, use methods to scroll the container to a specified location and control behavior with events.
---

# kendo.mobile.ui.Scroller

Represents the Kendo UI Mobile Scroller widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### elastic `Boolean`*(default: true)*

Weather or not to allow out of bounds dragging and easing.

#### Example
    <div data-role="view">
        foo
      <div data-role="scroller" style="width: 200px; height: 200px" data-elastic="false">
        <div style="width: 500px; height: 500px">Content</div>
      </div>
        bar
     </div>

    <script>
    new kendo.mobile.Application();
    </script>

### messages `Object`

Defines the text of the Scroller pull to refresh messages. Used primary for localization.

### messages.pullTemplate `String` *(default: "Pull to refresh")*

The message template displayed when the user pulls the scroller.
Has effect only when the `pullToRefresh` option is set to `true`.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true" data-messages='{ "pullTemplate": "Go" }'>
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script id="go" type="text/x-kendo-template">
        Go!
    </script>

    <script>
    new kendo.mobile.Application();
    </script>

### messages.refreshTemplate `String` *(default: "Refreshing")*

The message template displayed during the refresh.
Has effect only when the `pullToRefresh` option is set to `true`.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true" data-messages='{ "refreshTemplate": "progress" }'>
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script id="progress" type="text/x-kendo-template">
        In progress...
    </script>

    <script>
    new kendo.mobile.Application();
    </script>

### messages.releaseTemplate `String` *(default: "Release to refresh")*

The message template displayed when the user pulls the scroller below the `pullOffset`, indicating that `pullToRefresh` will occur.
Has effect only when the `pullToRefresh` option is set to `true`.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true" data-messages='{ "releaseTemplate": "release" }'>
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script id="progress" type="text/x-kendo-template">
        Let it go now...
    </script>

    <script>
    new kendo.mobile.Application();
    </script>

### pullOffset `Number`*(default: 140)*

The threshold below which releasing the scroller will trigger the pull event.
Has effect only when the `pullToRefresh` option is set to true.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true" data-pull-offset="20">
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### pullToRefresh `Boolean`*(default: false)*

If set to true, the scroller will display a hint when the user pulls the container beyond its top limit.
If a pull beyond the specified `pullOffset` occurs, a pull event will be triggered.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true">
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### useNative `Boolean` *(default: false)*

If set to true, the scroller will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8).
Native scrolling is only enabled on platforms that support it: iOS > 4, Android > 2, WP8. BlackBerry devices do support it, but the native scroller is flaky.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-use-native="true">
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### visibleScrollHints `Boolean` *(default: false)*

If set to `true`, the scroller scroll hints will always be displayed.

> The configuration option does not have any effect if the `useNative` option is set to `true`.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-visible-scroll-hints="true">
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### zoom `Boolean` *(default: false)*

If set to true, the user can zoom in/out the contents of the widget using the pinch/zoom gesture.

> The configuration option does not have any effect if the `useNative` option is set to `true`.

#### Example
    <div data-role="view">
        foo
      <div data-role="scroller" style="width: 200px; height: 200px" data-zoom="true">
        <div style="width: 500px; height: 500px">Zoomable Content</div>
      </div>
        bar
     </div>

    <script>
    new kendo.mobile.Application();
    </script>

## Methods

### animatedScrollTo

Scrolls the scroll container to the specified location with animation. The arguments should be negative numbers.

#### Example
    <div data-role="view">
        <a data-role="button" data-click="scrollTo">Scroll To</a>
        <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
             <div style="height: 500px; width: 500px"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  </div>
        </div>
    </div>

    <script>
        function scrollTo() {
            $("#scroller").data("kendoMobileScroller").animatedScrollTo(-100, -100);
        }

        new kendo.mobile.Application();
    </script>

#### Parameters

##### x `Number`

The horizontal offset in pixels to scroll to.

##### y `Number`

The vertical offset in pixels to scroll to.

### contentResized

Updates the scroller dimensions. Should be called after the contents of the scroller update their size

#### Example

``` html
    <div data-role="view">
        <a data-role="button" data-click="addContent">Append content</a>

        <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
        </div>
    </div>

    <script>
        function addContent() {
            var content = '<div style="height: 500px; width: 500px">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>';
            var scroller = $("#scroller").data("kendoMobileScroller");

            scroller.scrollElement.append(content);
            scroller.contentResized();
        }

        new kendo.mobile.Application();
    </script>
```

### destroy

Prepares the **Scroller** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Scroller element from DOM.

### disable

Disables the scrolling of the element.

#### Example
    <div data-role="view">
      <a data-role="button" data-click="disableScrolling">Disable Scrolling</a>
            <a data-role="button" data-click="enableScrolling">Enable Scrolling</a>
        <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
          <div style="height: 500px">
            Content
          </div>
        </div>
        bar
     </div>

    <script>
    function enableScrolling() {
      $("#scroller").data("kendoMobileScroller").enable();
    }

    function disableScrolling() {
      $("#scroller").data("kendoMobileScroller").disable();
    }

    new kendo.mobile.Application();
    </script>

### enable

Enables the scrolling of the element after it has been disabled by calling `disable`.

#### Example
    <div data-role="view">
      <a data-role="button" data-click="disableScrolling">Disable Scrolling</a>
            <a data-role="button" data-click="enableScrolling">Enable Scrolling</a>
        <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
          <div style="height: 500px">
            Content
          </div>
        </div>
        bar
     </div>

    <script>
    function enableScrolling() {
      $("#scroller").data("kendoMobileScroller").enable();
    }

    function disableScrolling() {
      $("#scroller").data("kendoMobileScroller").disable();
    }

    new kendo.mobile.Application();
    </script>

### height

Returns the viewport height of the scrollable element.

#### Example

    <div data-role="view">
      <a data-role="button" data-click="getHeight">Get Height</a>
       <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
          <div style="height: 500px">
            Content
          </div>
        </div>
        bar
     </div>

    <script>
    function getHeight() {
      console.log($("#scroller").data("kendoMobileScroller").height());
    }

    new kendo.mobile.Application();
    </script>

#### Returns

`Number` the viewport height in pixels.

### pullHandled

Indicate that the pull event is handled (i.e. data from the server has been retrieved).

#### Custom pull to refresh view scroll handling

     <div data-role="view" data-init="initPullToRefreshScroller">
         <h2 id="pull-to-refresh-clock"></h2>
     </div>

    <script>
     function updateClock() {
         pullTime = kendo.toString(new Date(), "hh:mm:ss tt" );
         $("#pull-to-refresh-clock").html("Last update at " + pullTime + ". <br /> Pull to refresh.");
     }

     function initPullToRefreshScroller(e) {
         var scroller = e.view.scroller;

         scroller.setOptions({
             pullToRefresh: true,
             pull: function() {
                 updateClock();
                 setTimeout(function() { scroller.pullHandled(); }, 400);
             }
         })
     }

      new kendo.mobile.Application();
    </script>

### reset

Scrolls the container to the top.

#### Example
    <div data-role="view">
      <a data-role="button" data-click="reset">Reset</a>
       <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
          <div style="height: 500px">
            Content
          </div>
        </div>
        bar
     </div>

    <script>
    function reset() {
        $("#scroller").data("kendoMobileScroller").reset();
    }

    new kendo.mobile.Application();
    </script>

#### Example

     <div data-role="view">

         <div style="height: 1500px">
            Content
         </div>
         <a data-role="button" data-click="reset">Reset</a>
     </div>

    <script>
    function reset() {
       kendo.mobile.application.scroller().reset();
    }

    new kendo.mobile.Application();
    </script>

### scrollHeight

Returns the height in pixels of the scroller content.

#### Example
    <div data-role="view">
      <a data-role="button" data-click="getHeight">Get Scroll Height</a>
       <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
          <div style="height: 500px">
            Content
          </div>
        </div>
        bar
     </div>

    <script>
    function getHeight() {
      console.log($("#scroller").data("kendoMobileScroller").scrollHeight());
    }

    new kendo.mobile.Application();
    </script>

### scrollTo

Scrolls the container to the specified location. The arguments should be negative numbers.

#### Example
    <div data-role="view">

    <a data-role="button" data-click="scrollTo">Scroll To</a>
        <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
             <div style="height: 500px; width: 500px"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  </div>
        </div>
    </div>

    <script>
    function scrollTo() {
        $("#scroller").data("kendoMobileScroller").scrollTo(-30, -30);
    }

    new kendo.mobile.Application();
    </script>

#### Parameters

##### x `Number`

The horizontal offset in pixels to scroll to.

##### y `Number`

The vertical offset in pixels to scroll to.

### scrollWidth

Returns the width in pixels of the scroller content.

#### Example
    <div data-role="view">
      <a data-role="button" data-click="getWidth">Get Scroll Height</a>
       <div data-role="scroller" style="width: 200px; height: 200px" id="scroller">
          <div style="height: 500px">
            Content
          </div>
        </div>
        bar
     </div>

    <script>
    function getWidth() {
      console.log($("#scroller").data("kendoMobileScroller").scrollWidth());
    }

    new kendo.mobile.Application();
    </script>

### zoomOut

Zooms the scroller out to the minimum zoom level possible.

> The scroller widget is when the mobile view is resized or displayed initially. You can use the after-show event for the zoomOut call.

#### Example
    <div data-role="view" data-after-show="zoomOut">
    foo
        <div data-role="scroller" id="myScroller" style="width: 200px; height: 200px" data-zoom="true">
        <div style="width: 500px; height: 500px">Zoomable Content</div>
        </div>
    bar
    </div>

    <script>
        function zoomOut(e) {
            $("#myScroller").data("kendoMobileScroller").zoomOut();
        }
        new kendo.mobile.Application();
    </script>

## Events

### pull

Fires when the pull option is set to true, and the user pulls the scrolling container beyond the specified pullThreshold.

#### Example
    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true" data-pull-offset="20" data-pull="foo">
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script>
    function foo() {
        console.log("foo!");
    }
    new kendo.mobile.Application();
    </script>

### resize

Fires when the scroller dimensions change (e.g. orientation change or resize)

#### Example

    <div data-role="view">
        foo
        <div data-role="scroller" style="width: 200px; height: 200px" data-pull-to-refresh="true" data-pull-offset="20" data-resize="foo">
            <div style="height: 500px">
                Content
            </div>
        </div>
        bar
    </div>

    <script>
    function foo() {
        console.log("foo!");
    }
    new kendo.mobile.Application();
    </script>

### scroll

Fires when the user scrolls through the content.

#### Bind to scroller scroll event in view init

    <div data-role="view" data-init="attachToScroller">
        <div style="height: 2000px">Foo</div>
    </div>
     <script>
        function attachToScroller(e) {
          var scroller = e.view.scroller;
          scroller.bind("scroll", function(e) {
             console.log(e.scrollTop);
             console.log(e.scrollLeft);
          });
        }

        new kendo.mobile.Application();
     </script>

#### Event Data

##### e.scrollTop `Number`

The number of pixels that are hidden from view above the scrollable area.

##### e.scrollLeft `Number`

The number of pixels that are hidden from view to the left of the scrollable area.

## Fields

### scrollElement `jQuery`

The inner **Scroller** element that holds the scrolling content. Use this field if you wish to change the element contents after the Scroller is initialized on it.

#### Replace the Scroller contents

    <div data-role="view" data-init="viewInit">
        <div id="scroller" data-role="scroller">Foo</div>
    </div>

    <script>
    function viewInit(e) {
      var scroller = $("#scroller").data("kendoMobileScroller");
      scroller.scrollElement.html("<b>New content</b>");
    }

    new kendo.mobile.Application();
    </script>

### scrollTop `Number`

The number of pixels that are hidden from view above the scrollable area.

### scrollLeft `Number`

The number of pixels that are hidden from view to the left of the scrollable area.
