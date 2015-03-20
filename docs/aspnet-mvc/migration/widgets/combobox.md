---
title: ComboBox
page_title: Server-side API documentation for Kendo UI jQuery ComboBox with ASP.NET MVC
description: Documentation and explanations about binding to List Collection and Ajax binding in the server-side API of Kendo UI ComboBox with ASP.NET MVC.
---

# Server-Side API

## DataBinding

Binding to **List<Selectlistitem>** Collection:
 
#### Old
 
    Html.Telerik().ComboBox()
        .Name(“Combo”)
        .BindTo(new SelectList(Model.Products, "ProductID", "ProductName"))
 
#### New
 
    Html.Kendo().ComboBox()
        .Name(“Combo”)
        .BindTo(new SelectList(Model.Products, "ProductID", "ProductName"))
        .DataTextField(“Text”)
        .DataValueField(“Value”)
 
Manually creating items:
 
#### Old
 
    Html.Telerik().ComboBox()
    .Name(“Combo”)
    . Items( items => items.Add().Text("Item1").Value("1"))
 
#### New
 
    Html.Kendo().ComboBox()
        .Name(“Combo”)
        .Items( items => items.Add().Text("Item1").Value("1"))
        .DataTextField(“Text”)
        .DataValueField(“Value”)
 
Ajax binding:
 
#### Old

    Html.Telerik().ComboBox()
        .Name(“Combo”)
        .DataBinding(binding => binding.Ajax().Select(“_Select”, “Combo”))
 
#### New
 
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
 
Defining **Delay**:
 
#### Old
 
    Html.Telerik().ComboBox()
        .Name(“Combo”)
        .DataBinding(binding => binding.Ajax().Delay(300))
 
#### New
 
    Html.Kendo().ComboBox()
        .Name(“Combo”)
        .Delay(300)
     
Defining **ServerFiltering**:
 
#### Old

Not supported
 
#### New
 
    Html.Kendo().ComboBox().Name(“Combo”)
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home");
            }).ServerFiltering(true);
        })
        .DataTextField(“Text”)
        .DataValueField(“Value”)
     
Sending Parameters to the server:
 
#### Old

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
 
#### New
 
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
    
Binding to a collection which is not a **List<Selectlistitem>**:
 
#### Old

Not supported
 
#### New
 
    Html.Kendo().ComboBox().Name(“Combo”)
        .DataTextField(“CompanyName”)
        .DataValueField(“CompanyID”)
        .BindTo(List<Company>);
    })
    
## Other Options

Filter:
 
#### Old

    <%= Html.Telerik().ComboBox()
        .Name("AjaxComboBox")
        .Filterable(filtering =>
        {
            filtering.FilterMode(AutoCompleteFilterMode.Contains);                             
        })
 
#### New

    @(Html.Kendo().ComboBox()
        .Name("fabric")
        .Filter(FilterType.StartsWith)
    )
 
Minimum characters:
 
#### Old

    <%= Html.Telerik().ComboBox()
        .Name("AjaxComboBox")
        .Filterable(filtering =>
        {
            filtering.MinimumChars(2);
        })
 
#### New
 
    @(Html.Kendo().ComboBox()
        .Name("fabric")
        .MinLength (2)
    )
    
Define suggestion (Autofill) of the ComboBox:
 
#### Old
 
    Html.Telerik().ComboBox().Name("AjaxComboBox").AutoFill(true)
 
#### New

    Html.Kendo().ComboBox().Name("AjaxComboBox").Suggest(true)

Setting the placeholder:
 
#### Old

    //Create item with text  “Select…” and value “”
    Html.Telerik().ComboBox().Name("AjaxComboBox").Placeholder(“Select…”)
 
#### New

    //Html5 placeholder
    Html.Kendo().ComboBox().Name("AjaxComboBox"). Placeholder (“2”)

Defining the animations:
 
#### Old

    Html.Telerik().ComboBox().Name("AjaxComboBox").Effects(effects => effects.Slide())
 
#### New
    Html.Kendo().ComboBox().Name("AjaxComboBox") .Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))

Setting **AutoBind**:

#### Old

    Not supported (when Ajax binding always autoBind: false)

#### New

    Html.Kendo().ComboBox().Name("Combo").AutoBind(false)

Setting **SelectedText** when **AutoBind** is false:

#### Old
    
    Html.Telerik().ComboBox().Name("Combo")
        .DataBinding(binding => binding.Ajax().Select(“”, “”))
        .InputHtmlAttribute(new { value = “Chai” })

#### New

    Html.Kendo().ComboBox().Name("Combo").AutoBind(false).Text(“Chai”)

Highlighting the first item:

#### Old
    
    HighlightFirstMatch(true)
 
#### New
    
    HighlightFirst (true)

Kendo does not support action syntax - “() => {}”.  all widgets do not have **Onload** event:
 
#### Old

    Html.Telerik().ComboBox().Name("Combo").ClientEvents( events => events.OnChange(“change”))
 
#### New

    Html.Kendo().ComboBox().Name("Combo").Events( events => events.Change(“change”))

Defining templates:

#### Old

Not supported
 
#### New
    
    Html.Kendo().ComboBox().Name("Combo").Template(“#= data.CompanyName #”)

Defining the height of the popup element:

#### Old

    Html.Telerik().ComboBox().Name("Combo").DropDownHtmlAttributes( new style { height = “300px” })
 
#### New
    
    Html.Kendo().ComboBox().Name("Combo").Height(300)

Cascading functionality:
 
#### Old

    Html.Telerik().ComboBox().Name("Combo").CascadeTo(“Id of the child ComboBox”)
 
#### New
    
    Html.Kendo().ComboBox().Name("Combo").CascadeFrom(“Id of the parent ComboBox”)

Encode:
 
#### Old

    Encode(false)
 
#### New
    
    Template(“ #= data.Text #”)

### Client-Side API
 
#### MVC -> Kendo
 
##### value

value

##### open

open

##### close

close

##### highlight

None

##### text

text

##### select

select

##### enable

enable

##### disable

enable(false)

##### dataBind

dataSource.data(data)

##### reload

dataSource.read()
