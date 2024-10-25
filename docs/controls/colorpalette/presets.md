---
title: Color Presets
page_title: jQuery ColorPalette Documentation - ColorPalette Color Presets
description: "Learn more about the sets of predefined palettes in the Kendo UI for jQuery ColorPalette and how to customize them."
slug: presets_kendoui_colorpalette_widget
position: 3
---

# Color Presets

The ColorPalette provides a set of predefined color palettes such as `basic` (default) and `websafe`. You can also configure a custom set of palettes.

The example below demonstrates how to use the presets and add custom palettes:

```dojo
    <div id="example">
    <div class="box wide">
        <div class="box-col">
            <h4>Office</h4>
            <div id="office"></div>
            <script>
                $("#office").kendoColorPalette({
                    palette: [
                        "#ffffff", "#000000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#8064a2", "#f79646",
                        "#f2f2f2", "#7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada",
                        "#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5",
                        "#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#92cddc", "#fac08f",
                        "#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#31859b", "#e36c09",
                        "#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#205867", "#974806"
                    ]
                })
            </script>
        </div>


        <div class="box-col">
            <h4>Apex</h4>
            <div id="apex"></div>
            <script>
                $("#apex").kendoColorPalette({
                    palette: [
                        "#ffffff", "#000000", "#c9c2d1", "#69676d", "#ceb966", "#9cb084", "#6bb1c9", "#6585cf", "#7e6bc9", "#a379bb",
                        "#f2f2f2", "#7f7f7f", "#f4f2f5", "#e0e0e2", "#f5f1e0", "#ebefe6", "#e1eff4", "#e0e6f5", "#e5e1f4", "#ece4f1",
                        "#d8d8d8", "#595959", "#e9e6ec", "#c2c1c5", "#ebe3c1", "#d7dfcd", "#c3dfe9", "#c1ceeb", "#cbc3e9", "#dac9e3",
                        "#bfbfbf", "#3f3f3f", "#dedae3", "#a4a3a8", "#e1d5a3", "#c3cfb5", "#a6d0de", "#a2b5e2", "#b1a6de", "#c7aed6",
                        "#a5a5a5", "#262626", "#9688a5", "#4e4d51", "#ae9638", "#758c5a", "#3d8da9", "#365bb0", "#533da9", "#7d4d99",
                        "#7f7f7f", "#0c0c0c", "#635672", "#343336", "#746425", "#4e5d3c", "#295e70", "#243c75", "#372970", "#533366"
                    ]
                })
            </script>
        </div>


        <div class="box-col">
            <h4>Austin</h4>
            <div id="austin"></div>
            <script>
                $("#austin").kendoColorPalette({
                    palette: [
                        "#ffffff", "#000000", "#caf278", "#3e3d2d", "#94c600", "#71685a", "#ff6700", "#909465", "#956b43", "#fea022",
                        "#f2f2f2", "#7f7f7f", "#f4fce4", "#dddcd0", "#efffc0", "#e3e1dc", "#ffe0cb", "#e8e9df", "#ece1d6", "#feecd2",
                        "#d8d8d8", "#595959", "#e9f9c9", "#bbb9a1", "#dfff82", "#c8c3ba", "#ffc299", "#d2d4c0", "#dac3ad", "#fed9a6",
                        "#bfbfbf", "#3f3f3f", "#dff7ae", "#ada598", "#cfff43", "#ada598", "#ffa365", "#bcbfa1", "#c8a585", "#fec67a",
                        "#a5a5a5", "#262626", "#a9ea25", "#2e2d21", "#6f9400", "#544e43", "#bf4d00", "#6c6f4b", "#6f5032", "#d77b00",
                        "#7f7f7f", "#0c0c0c", "#74a50f", "#1f1e16", "#4a6300", "#38342d", "#7f3300", "#484a32", "#4a3521", "#8f5200"
                    ]
                })
            </script>
        </div>

        <br style="clear:both">

        <div class="box-col">
            <h4>WebSafe</h4>
            <div id="websafe"></div>
            <script>
                $("#websafe").kendoColorPalette({
                    palette: "websafe"
                })
            </script>
        </div>
        <div class="box-col">
            <h4>Basic</h4>
            <div id="basic"></div>
            <script>
                $("#basic").kendoColorPalette({
                    palette: "basic"
                })
            </script>
        </div>
    </div>
</div>
```

## See Also

* [Palette Presets of the ColorPalette (Demo)](https://demos.telerik.com/kendo-ui/colorpalette/palette-presets)
* [JavaScript API Reference of the ColorPalette](/api/javascript/ui/colorpalette)
