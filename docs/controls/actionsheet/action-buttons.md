---
title: Action Buttons
page_title: Kendo UI for jQuery ActionSheet Documentation - Action Buttons
description: "Get started with the Kendo UI for jQuery ActionSheet and learn about its action buttons orientation options."
components: ["actionsheet"]
slug: actionbuttons_orientation_actionsheet_widget
position: 4
---

# Action Buttons

Starting with the 2025 Q2 release, the ActionSheet allows configuring the orientation and layout of the action buttons.

## Orientation

By default, the ActionSheet component displays the action buttons in `horizontal` orientation, but also allows you to set their visualization to `vertical`. You can control this behavior with the [`actionButtonsOrientation`](/api/javascript/ui/actionsheet/configuration/actionbuttonsorientation) configuration option.  

To configure the orientation of the action buttons, set the `actionButtonsOrientation` option to one of the following values:

* `vertical`
* `horizontal`

The example below demonstrates the action buttons appearance in both `horizontal` and `vertical` modes. 

```dojo
    <div>
        <label for="orientation">Orientation:</label>
        <select id="orientation">
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
        </select>
    </div>
   

    <button id="open">Open Actionsheet</button>
    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Select item',
            actionButtonsOrientation: 'vertical',
            actionButtons: [
                {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm"
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close"
                }
            ]
        }).data('kendoActionSheet');

        $('#open').kendoButton({
            themeColor: 'primary',
            click: function(){
                actionsheet.open();
            }
        })

        $("#orientation").kendoDropDownList({
            change: function(e){
                actionsheet.setOptions({
                actionButtonsOrientation: $("#orientation").val()
            });
            }
        });
    </script>
```

## Alignment

The ActionSheet component supports multiple types of [`actionButtonsAlignment`](/api/javascript/ui/actionsheet/configuration/actionbuttonsalignment). By default, the action buttons are rendered `stretched`. This alignment of the action buttons works only when the `actionButtonsOrientation` is set to `horizontal` mode. The supported values are:

* `stretched`
* `justify`
* `start`
* `center`
* `end`

The example below demonstrates all alignments: 

```dojo
     <div>
        <label for="alignment">Alignment:</label>
        <select id="alignment">
            <option value="start">start</option>
            <option value="end" >end</option>
            <option value="center">center</option>
            <option value="stretched" selected="true">stretched</option>
            <option value="justify">justify</option>
        </select>
    </div>

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Select item',
            items: [
                    {
                        text: 'Add to Favorites',
                        iconClass: 'k-i-heart',
                    }
            ],
            actionButtons: [
                {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm"
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close"
                }
            ]
        }).data('kendoActionSheet');


        $("#alignment").kendoDropDownList({
            change: function(){
                actionsheet.setOptions({
                    actionButtonsAlignment: $("#alignment").val()
                });
                actionsheet.open();
            }
        });
    </script>
```

## See Also

* [Overview of the ActionSheet (Demo)](https://demos.telerik.com/kendo-ui/actionsheet/index)
* [JavaScript API Reference of the ActionSheet](/api/javascript/ui/actionsheet)
