---
title: How to Make the Kendo UI DropDownList Search Box Clickable in a Bootstrap Modal
description: This article provides a solution for making the filter search box in a Kendo UI DropDownList focusable when used within a Bootstrap modal.
type: how-to
page_title: Editable Search Box in Kendo UI DropDownList in Bootstrap Modal
slug: editable-search-box-kendo-ui-dropdownlist-bootstrap-modal
tags: kendo, dropdownlist, search box, editable, bootstrap modal
res_type: kb
---
## Environment
| Product | Version |
|---------|---------|
| Kendo UI DropDownList | 2023.3.1114 |

## Description
I have my DropDownList rendered in a Bootstrap 3 or Bootstrap 4 Modal and the filter search box is not accessible. I want to make the search box focusable.

> Bootstrap modal dialogs prevent access to Kendo UI popups, which are opened by components placed inside the modal dialog. In such cases, use non-modal Bootstrap dialogs or [`modal Kendo UI Windows`](https://docs.telerik.com/kendo-ui/controls/window/overview).

## Solution

You can add the following logic to remove the `focusin` event listener from the modal.

```javascript
   $('#testmodal').on('shown.bs.modal', function() {
          $(document).off('focusin.modal');
    });
```

Below you can find a runnable example demonstrating this approach.

```dojo
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script> 

    <button id="change" type="button" data-toggle="modal" data-target="#testmodal">Open Modal</button>
    <br />


    <div class="modal fade" id="testmodal" data-backdrop="close" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="filters" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary" id="filters">Filters</h5>
          </div>

          <div class="modal-body" style="height: 400px">
            <div id="dropdown"></div>				
          </div>
        </div>
      </div>
    </div>
    <script>
      $(document).ready(function () {
        $('#testmodal').on('shown.bs.modal', function() {
          $(document).off('focusin.modal');
        });

        $("#change").kendoButton();

        $("#dropdown").kendoDropDownList({
          filter: "contains",
          optionLabel: "All",
          dataSource: [
            { name: "Red" },
            { name: "Green" }
          ],
          dataTextField: "name",
          dataValueField: "name"
        });
      });
    </script>
```

Now, the search box in the Kendo UI DropDownList within the Bootstrap modal should be editable.



