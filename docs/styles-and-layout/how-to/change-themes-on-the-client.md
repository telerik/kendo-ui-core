---
title: Change Themes on the Client
page_title: Change Themes on the Client | Kendo UI Desktop Widgets
description: "Learn how to change themes on the client when styling the Kendo UI desktop widgets and controls for data visualization."
slug: howto_changethemes_ontheclient_styleskendoui
position: 1
---

# Change Themes on the Client

The example below demonstrates a possible way to switch Kendo UI themes on the client.

Тhe core functionality of the following demo is replacing CSS stylesheets on the client, which is not something related to Kendo UI and does not require any Kendo UI APIs. From this point of view, the example is provided "as is", and may need customization and tweaking depending on the specific scenario, requirements, browser support, etc.

```html

<style>

  html {
    font: 13px sans-serif;
  }

  span.themeChooser {
    float: right;
  }

  #tree {
    height: 9em;
  }

</style>

<div>

  <input class="themeChooser" value="default" />

  <p><input id="datetimepicker" /></p>

  <p><input id="numeric" /></p>

  <p><input id="slider" /></p>

  <div id="tree"></div>

  <p>Note: in order for the whole page to be styled, the &lt;body&gt; element has a <code>k-content</code> class.</p>

</div>

<script>

  $(function(){

    $(document.body).addClass("k-content");

    // theme chooser dropdown
    $(".themeChooser").kendoDropDownList({
      dataSource: [
        { text: "Black", value: "black" },
        { text: "Blue Opal", value: "blueopal" },
        { text: "Default", value: "default" },
        { text: "Material", value: "material" },
        { text: "Metro", value: "metro" },
        { text: "Silver", value: "silver" }
      ],
      dataTextField: "text",
      dataValueField: "value",
      change: function (e) {
        var theme = (this.value() || "default").toLowerCase();

        changeTheme(theme);
      }
    });

    // sample widgets on the page
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

    // loads new stylesheet
    function changeTheme(skinName, animate) {
      var doc = document,
          kendoLinks = $("link[href*='kendo.']"),
          commonLink = kendoLinks.filter("[href*='kendo.common']"),
          skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
          href = location.href,
          skinRegex = /kendo\.\w+(\.min)?\.css/i,
          extension = skinLink.attr("rel") === "stylesheet" ? ".css" : ".less",
          newSkinUrl = skinLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1" + extension);

      function preloadStylesheet(file, callback) {
        var element = $("<link rel='stylesheet' href='" + file + "' \/>").appendTo("head");

        setTimeout(function () {
          callback();
          element.remove();
        }, 100);
      }

      function replaceTheme() {
        var browser = kendo.support.browser,
            oldSkinName = $(doc).data("kendoSkin"),
            newLink;

        if (browser.msie && browser.version < 10) {
          newLink = doc.createStyleSheet(newSkinUrl);
        } else {
          newLink = skinLink.eq(0).clone().attr("href", newSkinUrl);
          newLink.insertBefore(skinLink[0]);
        }

        skinLink.remove();

        $(doc.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
      }

      if (animate) {
        preloadStylesheet(url, replaceTheme);
      } else {
        replaceTheme();
      }
    };

  });

</script>

```

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
