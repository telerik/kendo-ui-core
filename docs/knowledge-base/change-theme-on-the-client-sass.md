---
title: Change Themes on the Client
page_title: Modify and Change Themes on the Client - Styles and Appearance
description: "Learn how to change themes on the client when styling the Kendo UI widgets."
previous_url: /styles-and-layout/change-themes-on-the-client, /styles-and-layout/how-to/change-themes-on-the-client
slug: change-theme-on-the-client-sass
tags: theme, sass
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
</table>

## Description

How can I change the selected Kendo Theme at runtime?

## Solution

The following example demonstrates a possible way to switch the Kendo UI themes on the client by replacing the CSS stylesheets.

Because this approach is not related to the functionality of the Kendo UI suite, it does not require you to apply Kendo UI API calls. As a result, depending on the requirements of your project, you might have to customize and tweak the code.

```dojo
 <h4>Select Theme:</h4>
    <input id="theme" class="themeChooser"/>

    <h4>Select Swatch:</h4>
    <input id="swatch" class="themeChooser"/>


    <div id="container">
      <h4>Grid</h4>
      <div id="grid"></div>     

      <h4>DateTimePicker</h4>
      <input id="datetimepicker" />

      <h4>NumericTextBox</h4>
      <input id="numeric" />

      <div class="inner-container">
        <div class="inner">
          <h4>Calendar</h4>
          <div id="calendar"></div>
        </div>
        <div class="inner">
          <h4>Slider</h4>
          <input id="slider" />

          <h4>TreeView</h4>
          <div id="tree"></div>
        </div>
      </div>

      <h4>Editor</h4>
      <textarea id="editor"></textarea>
    </div>


    <script>


      $(document).ready(function () {

        // In order for the whole page to be styled, the <body> element has a 'k-content' class
        $(document.body).addClass("k-content");

        // Theme chooser drop-down.
        var dataSource = new kendo.data.DataSource({
          data: [
            //default themes
            { text: "Default Main", value: "default-main", themeId: 1 },
            { text: "Default Main Dark", value: "default-main-dark", themeId: 1 },
            { text: "Nordic", value: "default-nordic", themeId: 1 },
            { text: "Ocean Blue", value: "default-ocean-blue", themeId: 1 },
            { text: "Purple", value: "default-purple", themeId: 1 },
            { text: "Turquoise", value: "default-turquoise", themeId: 1 },
            //bootstrap  themes
            { text: "Bootstrap Main", value: "bootstrap-main", themeId: 2 },
            { text: "Bootstrap Main Dark", value: "bootstrap-main-dark", themeId: 2 },
            { text: "Nordic", value: "bootstrap-nordic", themeId: 2 },
            { text: "Urban", value: "bootstrap-urban", themeId: 2 },
            { text: "Vintage", value: "bootstrap-vintage", themeId: 2 },
            //material themes  
            { text: "Material Main", value: "material-main", themeId: 3  },           
            { text: "Arctic", value: "material-arctic", themeId: 3  },
            { text: "Material Lime Dark", value: "material-lime-dark", themeId: 3 },
            { text: "Material Main Dark", value: "material-main-dark", themeId: 3  },
            { text: "Nova", value: "material-nova", themeId: 3  },
            //classic themes
            { text: "Classic Main", value: "classic-main", themeId: 4 },
            { text: "Classic Main Dark", value: "classic-main-dark", themeId: 4 },
            { text: "Opal", value: "classic-opal", themeId: 4 },
            { text: "Silver", value: "classic-silver", themeId: 4 },
          ]
        });


        $("#theme").kendoDropDownList({
          dataTextField: "themeName",
          dataValueField: "themeId",
          dataSource: [
            { themeName: "Default", themeId: 1 },
            { themeName: "Bootstrap", themeId: 2 },
            { themeName: "Material", themeId: 3 },
            { themeName: "Classic", themeId: 4 },
          ]
        });

        $("#swatch").kendoDropDownList({
          cascadeFrom: "theme",
          dataSource: dataSource,
          dataTextField: "text",
          dataValueField: "value",
          change: function (e) {
            var themeName = $("#theme")
            .data("kendoDropDownList")
            .text()
            .toLowerCase();
            var swatch = this.value();

            $("link").each(function () {
              if (this.href.indexOf("/themes/") != -1) {
                var themeVersion = this.href.split("/")[4];
                var curHref = "https://kendo.cdn.telerik.com/themes/" +
                    themeVersion +
                    "/" +
                    themeName +
                    "/" +
                    swatch +
                    ".css";
                this.href = curHref;
              }
            });           
          }
        });


        // Sample widgets on the page.      

        $("#grid").kendoGrid({
          columns: [
            { field: "name" },
            { field: "age" }
          ],          
          dataSource: {
            data: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 },
              { name: "Mike Doe", age: 31 },
              { name: "Tom Doe", age: 35 },
              { name: "Danny Doe", age: 37 }
            ]
          }
        });

        $("#calendar").kendoCalendar();

        $("#datetimepicker").kendoDateTimePicker();
        $("#numeric").kendoNumericTextBox();
        $("#slider").kendoSlider();
        $("#tree").kendoTreeView({
          dataSource: [
            { text: "foo", expanded: true, items: [
              { text: "bar", selected: true }
            ]
            },
            { text: "baz" }
          ]
        });

        $("#editor").kendoEditor();

      });



    </script>
    <style>
      #container{
        margin-top: 50px;
      }

      h4{
        margin-bottom: 5px;

      }

      .inner{
        width: 45%;
      }

      .inner-container{
        display: flex;
      }
    </style>
```

## See Also

* [Components Rendering Overview](https://docs.telerik.com/kendo-ui/styles-and-layout/components-rendering-overview)
