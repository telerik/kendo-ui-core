---
title: Changing Themes on the Client
page_title: Changing Themes on the Client | Kendo UI Styles and Appearance
description: "Learn how to change themes on the client when styling the Kendo UI widgets."
previous_url: /styles-and-layout/how-to/change-themes-on-the-client
slug: howto_changethemes_ontheclient_styleskendoui
position: 8
---

# Changing Themes on the Client

The following example demonstrates a possible way to switch the Kendo UI themes on the client by replacing the CSS stylesheets.

Because this approach is not related to the functionality of the Kendo UI suite, it does not require you to apply Kendo UI API calls. As a result, depending on the requirements of your project, you might have to customize and tweak the code.

> To achieve a dynamic switching from or to [Sass themes]({% slug sassbasedthemes_kendoui %}), the page has to be fully reloaded (`location.reload()`). The reason for this behavior is that the common resources that are used are different and the browser is not capable of dynamically unloading the resources that are not necessary.

```dojo

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

    // Theme chooser drop-down.
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

    // Sample widgets on the page.
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

    // Loads a new stylesheet.
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

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [Sass ThemeBuilder Overview]({% slug sassbasedthemes_kendoui %}#sass-theme-builder)
* [Less ThemeBuilder Overview]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-theme-builder)
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets]({% slug forms_hybridkendoui %})
