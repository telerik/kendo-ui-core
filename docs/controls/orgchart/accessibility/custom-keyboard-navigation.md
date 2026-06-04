---
title: Custom Key Handling
page_title: jQuery OrgChart Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery OrgChart by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["orgchart"]
slug: custom_keynav_orgchart_kendoui
position: 3
---

# Custom Key Handling

The OrgChart exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused OrgChart card receives keyboard input, the `kendoKeydown` event fires before the OrgChart runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the OrgChart instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the OrgChart from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The OrgChart uses `Arrow` keys to navigate between nodes. The following example replaces `Arrow Up`, `Arrow Down`, `Arrow Left`, and `Arrow Right` with the `U`, `D`, `L`, and `R` keys.

```dojo
    <div id="orgchart"></div>
    <script>
    $("#orgchart").kendoOrgChart({
        dataSource: [
            { id: 1, name: "CEO", title: "Chief Executive" },
            { id: 2, parentId: 1, name: "CTO", title: "Chief Technology" },
            { id: 3, parentId: 1, name: "CFO", title: "Chief Finance" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN ||
                e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement).closest(".k-orgchart-card");
            if (!focused.length) { return; }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                focused.closest(".k-orgchart-node-container").parent().closest(".k-orgchart-node-container")
                    .find(".k-orgchart-card:first").trigger("focus");
            }

            if (e.keyCode === 76 || e.keyCode === 82) { // 'L' or 'R'
                e.preventKendoKeydown = true;
                var group = focused.closest(".k-orgchart-node-group");
                var sibling = e.keyCode === 76 ? group.prev(".k-orgchart-node-group") : group.next(".k-orgchart-node-group");
                if (sibling.length) {
                    sibling.find(".k-orgchart-card:first").trigger("focus");
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `I` key shortcut that logs the data of the currently focused node.

```dojo
    <div id="orgchart"></div>
    <script>
    $("#orgchart").kendoOrgChart({
        dataSource: [
            { id: 1, name: "CEO", title: "Chief Executive" },
            { id: 2, parentId: 1, name: "CTO", title: "Chief Technology" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === 73) { // 'I'
                var card = $(document.activeElement).closest(".k-orgchart-card");
                if (card.length) {
                    console.log("Node:", card.find(".k-orgchart-card-title").text());
                }
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [OrgChart Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/orgchart/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_orgchart_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the OrgChart]({% slug keynav_kendoui_orgchart_widget %})
* [Accessibility in the OrgChart]({% slug jquery_orgchart_accessibility %})
