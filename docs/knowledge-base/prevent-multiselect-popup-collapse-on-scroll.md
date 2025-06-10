---
title: Preventing MultiSelect Pop-up from Collapsing on Page Scroll
description: Learn how to keep the MultiSelect widget's pop-up open when scrolling elsewhere on the page.
type: how-to
page_title: How to Keep the MultiSelect Pop-up Open During Page Scroll
slug: prevent-multiselect-pop-up-collapse-on-scroll
tags: kendo-ui, multiselect, popup, scroll, open
res_type: kb
ticketid: 1657504
---

## Environment

| Product | Kendo UI for jQuery MultiSelect |
| --- | --- |
| Version | Current |

## Description

When using the [MultiSelect](https://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview) for Progress® Kendo UI®, the pop-up list closes upon scrolling the page. I want to configure the MultiSelect so that scrolling elsewhere on the page does not cause the pop-up to disappear.

This KB article also answers the following questions:
- How can I keep the MultiSelect pop-up open while scrolling the page?
- What settings prevent the MultiSelect drop-down from closing on page scroll?
- Is there a way to configure the MultiSelect pop-up to remain visible during page scrolls?

## Solution

To prevent the MultiSelect pop-up from collapsing when the page is scrolled, attach a handler to the `open` event of the MultiSelect. Within this handler, override the default behavior of the pop-up widget's close method. 

Here is how you can achieve this:

1. Initialize the MultiSelect and specify an `open` event handler.

```javascript
$("#multiSelect").kendoMultiSelect({
    dataSource: [/* DataSource goes here */],
    open: onOpen
});
```

2. Bind to the `window.scroll` event to change a boolean variable's value so that it can be used as flag

```javascript
$(window).scroll(function() {
          scroll = true;
          setTimeout(function(e) {
            scroll = false;
          });
});
```

3. In the `onOpen` event handler, override the pop-up's close method to prevent it from closing on scroll if the "scroll" boolean is set to "true".

```javascript
open:function(e){ 
            var popup = e.sender.popup;
            popup.bind("close", function(e) {
              if (scroll) {
                e.preventDefault(); //prevent popup closing                    
              }
            });
          }
```

Below you will find a complete example to demonstrate the approach:

```dojo
<div id="example">
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div id="example" style="min-height: 2000px; padding: 30px;">
        <input id="products" style="width: 400px" />
      </div>
    </div>

    <script>
      var scroll = false;
      $(function() {

        $("#products").kendoDropDownList({
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/Products",
              }
            }
          },
          value: "74",
          open:function(e){ 
            var popup = e.sender.popup;
            popup.bind("close", function(e) {
              if (scroll) {
                e.preventDefault(); //prevent popup closing                    
              }
            });
          }
        });

        $(window).scroll(function() {
          scroll = true;
          setTimeout(function(e) {
            scroll = false;
          });
        });

      });
    </script>

```

## See Also

- [Official Documentation for Kendo UI MultiSelect](https://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview)
- [MultiSelect Open Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/open)
