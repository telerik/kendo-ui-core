---
title: ComboBox
page_title: Migrating the ComboBox Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the ComboBox Extension."
previous_url: /migration/widgets/combobox
slug: combobox_migrationextensions_aspnetmvc
---

# Migrating the ComboBox Extension

To migrate the Telerik UI ComboBox Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when binding the ComboBox to `List<Selectlistitem>` collections.

    ```Previous

        Html.Telerik().ComboBox()
            .Name(“Combo”)
            .BindTo(new SelectList(Model.Products, "ProductID", "ProductName"))
    ```
    ```Current

        Html.Kendo().ComboBox()
            .Name(“Combo”)
            .BindTo(new SelectList(Model.Products, "ProductID", "ProductName"))
            .DataTextField(“Text”)
            .DataValueField(“Value”)
    ```

* The following example demonstrates the change when creating ComboBox items manually.

    ```Previous

        Html.Telerik().ComboBox()
        .Name(“Combo”)
        . Items( items => items.Add().Text("Item1").Value("1"))
    ```
    ```Current

        Html.Kendo().ComboBox()
            .Name(“Combo”)
            .Items( items => items.Add().Text("Item1").Value("1"))
            .DataTextField(“Text”)
            .DataValueField(“Value”)
    ```

* The following example demonstrates the change when doing Ajax binding.

    ```Previous

        Html.Telerik().ComboBox()
            .Name(“Combo”)
            .DataBinding(binding => binding.Ajax().Select(“_Select”, “Combo”))
    ```
    ```Current

        Html.Kendo().ComboBox().Name(“Combo”)
            .DataSource(source => {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home");
                })
                .ServerFiltering(true);
            })
            .DataTextField(“Text”)
            .DataValueField(“Value”)
    ```

* The following example demonstrates the change when defining a delay in the ComboBox.

    ```Previous

        Html.Telerik().ComboBox()
            .Name(“Combo”)
            .DataBinding(binding => binding.Ajax().Delay(300))
    ```
    ```Current

        Html.Kendo().ComboBox()
            .Name(“Combo”)
            .Delay(300)
    ```

* The following example demonstrates the change when defining server filtering in the ComboBox.

    ```Previous

    Not supported
    ```
    ```Current

        Html.Kendo().ComboBox().Name(“Combo”)
            .DataSource(source => {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home");
                }).ServerFiltering(true);
            })
            .DataTextField(“Text”)
            .DataValueField(“Value”)
    ```

* The following example demonstrates the change when sending parameters to the server.

    ```Previous

        <%= Html.Telerik().ComboBox()
            .Name("AjaxComboBox")
            …
            .ClientEvents(events => events.OnDataBinding("onComboBoxDataBinding"))
        %>

        <script type="text/javascript">
            function onComboBoxDataBinding(e) {
                e.data = $.extend({}, e.data, { filterMode: $('#ComboBoxAttributes_FilterMode').data('tDropDownList').value() });
            }
        </script>
    ```
    ```Current

        Html.Kendo().ComboBox().Name(“Combo”)
            .DataSource(source => {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home")
                        .Data(“addData”);
                })
            })
            .DataTextField(“Text”)
            .DataValueField(“Value”)

        <script type="text/javascript">
            function addData() {
                return { text : “Chai” }
            }
        </script>
    ```

* The following example demonstrates the change when binding to non-`List<Selectlistitem>` collections.

    ```Previous

    Not supported

    ```
    ```Current

        Html.Kendo().ComboBox().Name(“Combo”)
            .DataTextField(“CompanyName”)
            .DataValueField(“CompanyID”)
            .BindTo(List<Company>);
        })
    ```

* The following example demonstrates the change when doing filtering in the ComboBox.

    ```Previous

        <%= Html.Telerik().ComboBox()
            .Name("AjaxComboBox")
            .Filterable(filtering =>
            {
                filtering.FilterMode(AutoCompleteFilterMode.Contains);
            })
    ```
    ```Current

        @(Html.Kendo().ComboBox()
            .Name("fabric")
            .Filter(FilterType.StartsWith)
        )
    ```

* The following example demonstrates the change when defining minimum characters in the ComboBox.

    ```Previous

        <%= Html.Telerik().ComboBox()
            .Name("AjaxComboBox")
            .Filterable(filtering =>
            {
                filtering.MinimumChars(2);
            })

    ```
    ```Current

        @(Html.Kendo().ComboBox()
            .Name("fabric")
            .MinLength (2)
        )
    ```

* The following example demonstrates the change when implementing suggestions (`AutoFill`) in the ComboBox.

    ```Previous

        Html.Telerik().ComboBox().Name("AjaxComboBox").AutoFill(true)

    ```
    ```Current

        Html.Kendo().ComboBox().Name("AjaxComboBox").Suggest(true)
    ```

* The following example demonstrates the change when setting the placeholder in the ComboBox.

    ```Previous

        // Create item with text  “Select…” and value “”
        Html.Telerik().ComboBox().Name("AjaxComboBox").Placeholder(“Select…”)

    ```
    ```Current

        //Html5 placeholder
        Html.Kendo().ComboBox().Name("AjaxComboBox"). Placeholder (“2”)
    ```

* The following example demonstrates the change when implementing animations in the ComboBox.

    ```Previous

        Html.Telerik().ComboBox().Name("AjaxComboBox").Effects(effects => effects.Slide())

    ```
    ```Current

        Html.Kendo().ComboBox().Name("AjaxComboBox") .Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))
    ```

* The following example demonstrates the change when using the `AutoBind` setting.

    ```Previous

    Not supported. During Ajax binding, the setting is always `autoBind: false`.

    ```
    ```Current

        Html.Kendo().ComboBox().Name("Combo").AutoBind(false)
    ```

* The following example demonstrates the change when using the `SelectedText` setting while `AutoBind` is set to `false`.

    ```Previous

        Html.Telerik().ComboBox().Name("Combo")
            .DataBinding(binding => binding.Ajax().Select(“”, “”))
            .InputHtmlAttribute(new { value = “Chai” })
    ```
    ```Current

        Html.Kendo().ComboBox().Name("Combo").AutoBind(false).Text(“Chai”)
    ```

* The following example demonstrates the change when highlighting the first ComboBox item.

    ```Previous

        HighlightFirstMatch(true)
    ```
    ```Current

        HighlightFirst (true)
    ```

* Telerik UI for ASP.NET MVC does not support action syntax, that is, `“() => {}”`. The helpers do not feature the `OnLoad` event anymore and require you to use `$(document).ready()` instead.

    ```Previous

        Html.Telerik().ComboBox().Name("Combo").ClientEvents( events => events.OnChange(“change”))
    ```
    ```Current

        Html.Kendo().ComboBox().Name("Combo").Events( events => events.Change(“change”))
    ```

* The following example demonstrates the change when using templates.

    ```Previous

    Not supported

    ```
    ```Current

        Html.Kendo().ComboBox().Name("Combo").Template(“#= data.CompanyName #”)
    ```

* The following example demonstrates the change when setting the height of the popup element.

    ```Previous

        Html.Telerik().ComboBox().Name("Combo").DropDownHtmlAttributes( new style { height = “300px” })

    ```
    ```Current

        Html.Kendo().ComboBox().Name("Combo").Height(300)
    ```

* The following example demonstrates the change when implementing cascading ComboBoxes.

    ```Previous

        Html.Telerik().ComboBox().Name("Combo").CascadeTo(“Id of the child ComboBox”)

    ```
    ```Current

        Html.Kendo().ComboBox().Name("Combo").CascadeFrom(“Id of the parent ComboBox”)
    ```

* The following example demonstrates the change when adding encoding to the ComboBox.

    ```Previous

        Encode(false)
    ```
    ```Current

        Template(“ #= data.Text #”)
    ```

* The following table lists the changes in the client-side API of the ComboBox.

      |Previous     |Current       |
      |:---         |:---             |
      | `value`     | `value`         |
      | `open`      | `open`          |
      | `close`     | `close`         |
      | `highlight` | None            |
      | `text`      | `text`          |
      | `select`    | `select`        |
      | `enable`    | `enable`        |
      | `disable`   | `enable(false)` |
      | `dataBind`  | `dataSource.data(data)` |
      | `reload`    | `dataSource.read()` |

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
