---
title: ComboBox
page_title: ComboBox | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI ComboBox widget."
slug: combobox_migrationextensions_aspnetmvc
---

# ComboBox Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI ComboBox widget.

## Server-Side API

### Data Binding

#### Bind to List<Selectlistitem> Collections

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

#### Create Items Manually

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

#### Do Ajax Binding

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

#### Define Delay

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

#### Define ServerFiltering

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

#### Send Parameters to Server

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

#### Bind to Non-List<Selectlistitem> Collections

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

### Other Options

#### Filter

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

#### Min Characters

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

#### Suggestions (AutoFill)

```Previous

    Html.Telerik().ComboBox().Name("AjaxComboBox").AutoFill(true)

```
```Current

    Html.Kendo().ComboBox().Name("AjaxComboBox").Suggest(true)
```

#### Placeholder

```Previous

    //Create item with text  “Select…” and value “”
    Html.Telerik().ComboBox().Name("AjaxComboBox").Placeholder(“Select…”)

```
```Current

    //Html5 placeholder
    Html.Kendo().ComboBox().Name("AjaxComboBox"). Placeholder (“2”)
```

#### Animations

```Previous

    Html.Telerik().ComboBox().Name("AjaxComboBox").Effects(effects => effects.Slide())

```
```Current

    Html.Kendo().ComboBox().Name("AjaxComboBox") .Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))
```

#### AutoBind

```Previous

Not supported. During Ajax binding, the setting is always `autoBind: false`.

```
```Current

    Html.Kendo().ComboBox().Name("Combo").AutoBind(false)
```

#### SelectedText when AutoBind is false

```Previous

    Html.Telerik().ComboBox().Name("Combo")
        .DataBinding(binding => binding.Ajax().Select(“”, “”))
        .InputHtmlAttribute(new { value = “Chai” })
```
```Current

    Html.Kendo().ComboBox().Name("Combo").AutoBind(false).Text(“Chai”)
```

#### First Item Highlighting

```Previous

    HighlightFirstMatch(true)
```
```Current

    HighlightFirst (true)
```

#### Unsupported onLoad Event

Kendo UI does not support action syntax&mdash;`“() => {}”`. None of the widgets supports the `Onload` event.

```Previous

    Html.Telerik().ComboBox().Name("Combo").ClientEvents( events => events.OnChange(“change”))
```
```Current

    Html.Kendo().ComboBox().Name("Combo").Events( events => events.Change(“change”))
```

#### Templates

```Previous

Not supported

```
```Current

    Html.Kendo().ComboBox().Name("Combo").Template(“#= data.CompanyName #”)
```

#### Height of Popup Element

```Previous

    Html.Telerik().ComboBox().Name("Combo").DropDownHtmlAttributes( new style { height = “300px” })

```
```Current

    Html.Kendo().ComboBox().Name("Combo").Height(300)
```

#### Cascading Functionality

```Previous

    Html.Telerik().ComboBox().Name("Combo").CascadeTo(“Id of the child ComboBox”)

```
```Current

    Html.Kendo().ComboBox().Name("Combo").CascadeFrom(“Id of the parent ComboBox”)
```

#### Encode

```Previous

    Encode(false)
```
```Current

    Template(“ #= data.Text #”)
```

## Client-Side API

| MVC         | Kendo UI        |
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

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the [**Widgets** folder]({% slug autocomplete_migrationextensions_aspnetmvc %}).
