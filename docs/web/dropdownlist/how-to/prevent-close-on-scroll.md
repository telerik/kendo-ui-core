---
title: Prevent DropDownList popup close on scroll
page_title: Prevent DropDownList popup close on scroll
description: Example that shows how to prevent popup close on scrolling when end of the list is reached
---

# How to prevent popup close on scroll

Example that shows how to prevent popup close on scrolling when end of the list is reached

#### Example:

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Products</h4>
        <input id="products" style="width: 400px" />
    </div>

    <script>
        function stopScroll(element) {
          var activeElement;

          $(document).bind('mousewheel DOMMouseScroll', function(e) {
              var scrollTo = null;

              if (!$(activeElement).closest(".k-popup").length) {
                return;
              }

              if (e.type == 'mousewheel') {
                  scrollTo = (e.originalEvent.wheelDelta * -1);
              }
              else if (e.type == 'DOMMouseScroll') {
                  scrollTo = 40 * e.originalEvent.detail;
              }

              if (scrollTo) {
                  e.preventDefault();
                  element.scrollTop(scrollTo + element.scrollTop());
              }
          });

          $(document).on('mouseover', function(e) {
                activeElement = e.target;
          });
        }

        $(document).ready(function() {
            $("#products").kendoDropDownList({
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "http://demos.telerik.com/kendo-ui/service/Products",
                        }
                    }
                },
                value: "74"
            });

            var widget = $("#products").data("kendoDropDownList");

            stopScroll(widget.ul);
        });
    </script>

    <style scoped>
        body { min-height: 1200px; padding: 30px; }

        .demo-section {
            width: 400px;
        }
        .demo-section h2 {
            text-transform: uppercase;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
    </style>
</div>
```
