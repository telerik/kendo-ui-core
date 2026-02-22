---
title: Customizing Expand/Collapse Icons in Kendo UI for jQuery TreeView
description: Learn how to replace the default expand/collapse arrow icons in the Kendo UI TreeView with custom icons.
type: how-to
page_title: Replace Expand/Collapse Arrow Icons in TreeView
meta_title: Replace Expand/Collapse Arrow Icons in TreeView
slug: replace-expand-collapse-icons-treeview
tags: treeview, customization, icons, expand, collapse
res_type: kb
components: ["treeview"]
ticketid: 1690579
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery TreeView</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to customize the expand/collapse icons in the [Kendo UI TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview) to display plus and minus icons instead of the default arrows. The icons revert back to the default arrows after expand or collapse actions, even though I have implemented code to change them in the `dataBound`, `collapse`, and `expand` events.

This knowledge base article also answers the following questions:
- How to change the expand/collapse icons in Kendo UI TreeView?
- How to ensure custom TreeView icons persist after expand or collapse?
- How to replace default arrow icons in TreeView with custom icons?

## Solution

To ensure the custom expand/collapse icons persist in the Kendo UI TreeView, you need to override the default icons using the `kendo.ui.icon` method in the `expand` and `collapse` events:

```javascript
$("#treeview").kendoTreeView({
          //changes icon on collapse
          collapse: function (e) {
            setTimeout(function () {
              if ($("span.k-svg-i-caret-alt-right").length > 0) {
                kendo.ui.icon($("span.k-svg-i-caret-alt-right"), {
                  icon: "plus-outline",
                });
              }
            }, 0);
          },

          //changes icon on expand
          expand: function (e) {
            setTimeout(function () {
              if ($("span.k-svg-i-caret-alt-down").length > 0) {
                kendo.ui.icon($("span.k-svg-i-caret-alt-down"), {
                  icon: "minus-outline",
                });
              }
            }, 0);
          },
        });
```

Additionally, the icons need to be initially changed after the creation of the component. Below is a complete example for reference:

```dojo
<ul id="treeview">
          <li data-expanded="true">
            <span class="k-sprite folder"></span>
            My Web Site
            <ul>
              <li data-expanded="true">
                <span class="k-sprite folder"></span>images
                <ul>
                  <li><span class="k-sprite image"></span>logo.png</li>
                  <li><span class="k-sprite image"></span>body-back.png</li>
                  <li><span class="k-sprite image"></span>my-photo.jpg</li>
                </ul>
              </li>
              <li data-expanded="true">
                <span class="k-sprite folder"></span>resources
                <ul>
                  <li data-expanded="true">
                    <span class="k-sprite folder"></span>pdf
                    <ul>
                      <li><span class="k-sprite pdf"></span>brochure.pdf</li>
                      <li><span class="k-sprite pdf"></span>prices.pdf</li>
                    </ul>
                  </li>
                  <li><span class="k-sprite folder"></span>zip</li>
                </ul>
              </li>
              <li><span class="k-sprite html"></span>about.html</li>
              <li><span class="k-sprite html"></span>contacts.html</li>
              <li><span class="k-sprite html"></span>index.html</li>
              <li><span class="k-sprite html"></span>portfolio.html</li>
            </ul>
          </li>
        </ul> 

      <script>
        $("#treeview").kendoTreeView({
          //changes icon on collapse
          collapse: function (e) {
            setTimeout(function () {
              if ($("span.k-svg-i-caret-alt-right").length > 0) {
                kendo.ui.icon($("span.k-svg-i-caret-alt-right"), {
                  icon: "plus-outline",
                });
              }
            }, 0);
          },

          //changes icon on expand
          expand: function (e) {
            setTimeout(function () {
              if ($("span.k-svg-i-caret-alt-down").length > 0) {
                kendo.ui.icon($("span.k-svg-i-caret-alt-down"), {
                  icon: "minus-outline",
                });
              }
            }, 0);
          },
        });

        //sets initial icons
        if ($("span.k-svg-i-caret-alt-down").length > 0) {
          kendo.ui.icon($("span.k-svg-i-caret-alt-down"), {
            icon: "minus-outline",
          });
        }

        if ($("span.k-svg-i-caret-alt-right").length > 0) {
          kendo.ui.icon($("span.k-svg-i-caret-alt-right"), {
            icon: "plus-outline",
          });
        }
      </script>

      <style>
        #treeview .k-sprite {
          background-image: url("../content/web/treeview/coloricons-sprite.png");
        }

        .rootfolder {
          background-position: 0 0;
        }

        .folder {
          background-position: 0 -16px;
        }

        .pdf {
          background-position: 0 -32px;
        }

        .html {
          background-position: 0 -48px;
        }

        .image {
          background-position: 0 -64px;
        }
      </style> 
```


## See Also

- [Kendo UI TreeView API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview) 
- [TreeView Events](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/events)
