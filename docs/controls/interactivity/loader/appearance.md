---
title: Appearance
page_title: jQuery Loader Documentation | Appearance
description: "Get started with the jQuery Loader by Kendo UI and set its size, type and themeColor configurations."
slug: appearance_kendoui_loader
position: 2
---

# Appearance

The Loader component provides several predefined appearance options such as different types, sizes and theme colors.

## Type

The Loader allows you to set different animations by using the `type` input property.

The available [`types`](/api/javascript/ui/loader/configuration/type) values are:
* `pulsing` (Default)&mdash;Applies pulsing animation on the Loader.
* `infinite-spinner`&mdash;Applies infinite-spinner animation on the Loader.
* `converging-spinner`&mdash;Applies converging-spinner animation on the Loader.

```dojo
    <div class="loader">
        <span id="pulsing"></span>
        <span id="infinite-spinner"></span>
        <span id="converging-spinner"></span>
    </div>
    <script>
        $(document).ready(function(){
            $("#pulsing").kendoLoader({
                type:'pulsing',
            });

            $("#infinite-spinner").kendoLoader({
                type:'infinite-spinner',
            });

            $("#converging-spinner").kendoLoader({
                type:'converging-spinner',
            });
        });
    </script>
    <style>
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height:450px;
      }

      .loader>span {        
        margin: 50px;
      }
    </style>
```

## Theme Color

The Loader allows you to specify predefined theme colors.

The available [`themeColor`](/api/javascript/ui/loader/configuration/themecolor) values are:

* `primary` (Default)&mdash;Applies coloring based on primary theme color.
* `secondary`&mdash;Applies coloring based on secondary theme color.
* `tertiary`&mdash; Applies coloring based on tertiary theme color.
* `info`&mdash;Applies coloring based on info theme color.
* `success`&mdash; Applies coloring based on success theme color.
* `warning`&mdash; Applies coloring based on warning theme color.
* `error`&mdash; Applies coloring based on error theme color.
* `dark`&mdash; Applies coloring based on dark theme color.
* `light`&mdash; Applies coloring based on light theme color.
* `inverse`&mdash; Applies coloring based on inverted theme color.

```dojo
    <div class="loader">
        <input id='themeColor'/>
        <span id="loader"></span>
    </div>
    <script>
        $(document).ready(function(){
            var loader = $("#loader").kendoLoader({
                themeColor:'secondary',
            }).data("kendoLoader");

            $("#themeColor").kendoDropDownList({
                dataSource:["primary", "secondary", "tertiary", "info", "success", "warning", "error", "dark", "light", "inverse" ],
                change: function(e){
                    loader.themeColor(e.sender.text());
                }
            });
        });
    </script>
    <style>
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height:450px;
      }     
    </style>
```

## Size

The Loader allows you to set different sizes.

The available [`size`](/api/javascript/ui/loader/configuration/size) values are:

* `small`
* `medium` (Default)
* `large`

```dojo
    <div class="loader">
        <span id="loader-small"></span>
        <span id="loader-medium"></span>
        <span id="loader-large"></span>
    </div>
    <script>
        $(document).ready(function(){
            $("#loader-small").kendoLoader({
                size:'small',
            });

            $("#loader-medium").kendoLoader({
                size:'medium',
            });

            $("#loader-large").kendoLoader({
                size:'large',
            });
        });
    </script>
    <style>
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height:450px;
      }

      .loader>span {        
        margin: 50px;
      }
    </style>
```

## See Also

* [API Reference of the Loader Component](/api/javascript/ui/loader)