---
title: Use jsSignature
page_title: Use jsSignature | Hybrid UI ListView
description: "Learn how to use jsSignature in the Hybrid UI ListView."
slug: howto_usejssignature_hybridlistview
---

# Use jsSignature

The example below demonstrates how to include a signing functionality by using jsSignature in a hybrid Kendo UI ListView.

###### Example

```html
    <script src="http://willowsystems.github.io/jSignature/js/libs/jSignature.min.js"></script>
    <div data-role="view" data-title="Views" data-init="attachToScroller">
      <header data-role="header">
        <div data-role="navbar">
          <a data-align="left" data-icon="arrow-w" data-role="backbutton" class="back-button"></a>
          <span data-role="view-title"></span>
        </div>
      </header>
      <ul data-role="listview" data-style="inset" data-type="group">
        <li>Sources
          <ul>
            <li><a href="#secondview">Local View</a></li>
            <li><a href="../content/mobile/view/remoteview.html">Remote View</a></li>
          </ul>
        </li>
      </ul>

      <ul data-role="listview" data-style="inset" data-type="group">
        <li>Types
          <ul>
            <li><a href="#stretchview">Stretched View</a></li>

            <li>

              <div class='signature-wrapper'><div id='signature'></div><input type='hidden' id='signature-value' name='signature-value' /></div>    

            </li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>
            <li><a href="#stretchview">Stretched View</a></li>

          </ul>
        </li>
      </ul>
    </div>

   <div data-role="view" id="secondview" data-layout="mobile-view" data-title="Local View">
      <div style="background: url(../content/shared/images/patterns/pattern7.png); color: #fff; padding: 50px 0; text-align: center;"><p>Hi, I'm a local view.</p>      </div>
   </div>

    <div data-role="view" id="stretchview" data-layout="mobile-view" data-title="Stretched View" data-stretch="true">
       <div style="background: url(../content/shared/images/patterns/pattern7.png); color: #fff; padding-top: 50px; text-align: center;"><p>Hi, I'm a stretched view.        </p><p>Use me for full screen content that doesn't need scrolling.</p></div>
    </div>

    <div data-role="layout" data-id="mobile-view">
      <header data-role="header">
        <div data-role="navbar">
          <a class="nav-button" data-align="left" data-role="backbutton">Back</a>
          <span data-role="view-title"></span>
          <a data-align="right" data-role="button" class="nav-button" href="#/">Index</a>
        </div>
      </header>
    </div>

    <script>

      var scroller;

      function attachToScroller(e) {
        scroller = e.view.scroller;
      }

      $("body").on("touchstart mousedown", ".signature-wrapper", function () {
        scroller.enabled = false;
      });

      $("body").on("mouseup touchend", function () {
        scroller.enabled = true;
      });


      var app = new kendo.mobile.Application(document.body);
      $("#signature").jSignature();
    </script>
```

## See Also

Other articles and how-to examples on the Hybrid UI ListView:

* [Hybrid UI ListView JavaScript API Reference](/api/javascript/mobile/ui/listview)
* [Overview of the Hybrid UI ListView]({% slug overview_hybridlistview %})
* [Endless Scrolling Feature]({% slug endlessscrolling_hybridlistview %})
* [Pull-to-Refresh Feature]({% slug pulltorefreshfeature_hybridlistview %})

For more runnable examples on the Kendo UI hybrid ListView, browse its [**How To** documentation folder]({% slug howto_group_data_hybridlistview %}).
