---
title: Custom Key Handling
page_title: jQuery MediaPlayer Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery MediaPlayer by Kendo UI using the kendoKeydown event."
components: ["mediaplayer"]
slug: custom_keynav_mediaplayer_kendoui
position: 3
---

# Custom Key Handling

The MediaPlayer exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the MediaPlayer is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the MediaPlayer instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the MediaPlayer from running its own handler for this key press.

## Overriding a Built-In Key Combination

The MediaPlayer uses `Arrow Left` and `Arrow Right` to seek. The following example replaces them with `L` and `R`.

```dojo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: false,
        media: { title: "Demo", source: "https://archive.org/download/ElephantsDream/ed_hd.mp4" },
        kendoKeydown: function(e) {
            var player = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                player.seek(Math.max(0, player.currentTime() - 10));
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                player.seek(player.currentTime() + 10);
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `M` key shortcut to mute/unmute.

```dojo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: false,
        media: { title: "Demo", source: "https://archive.org/download/ElephantsDream/ed_hd.mp4" },
        kendoKeydown: function(e) {
            if (e.keyCode === 77) {
                e.sender.mute(!e.sender.mute());
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [MediaPlayer Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/mediaplayer/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_mediaplayer_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the MediaPlayer]({% slug keynav_mediaplayer_jquery %})
* [Accessibility in the MediaPlayer]({% slug jquery_mediaplayer_accessibility %})
