---
title: Getting Started
page_title: jQuery Sortable Documentation - Getting Started with the Sortable
description: "Get started with the jQuery Sortable by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_sortable_widget
position: 1
---

# Getting Started with the Sortable

This guide demonstrates how to get up and running with the Kendo UI for jQuery Sortable.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="sortable">
      <div class="sortable">Item 1</div>
      <div class="sortable">Item 2</div>  
      <div class="sortable disabled">Disabled item 1</div>
      <div class="sortable">Item 3</div>
      <div class="sortable">Item 4</div>  
      <div class="not-sortable">Not sortable item 1</div>
      <div class="not-sortable">Not sortable item 2</div>
      <div class="sortable disabled">Disabled item 2</div>
      <div class="sortable">Item 5</div>
      <div class="sortable">Item 6</div>
    </div>

    <script>
      $(document).ready(function() {
        $("#sortable").kendoSortable({
          filter: ".sortable",
          disabled: ".disabled",
          cursor: "grab",
          hint: function(element) {            
            return $("<span class='custom-hint'></span>")
              .text(element.text() + ' custom hint text')
              .append('<span class="k-icon k-i-clock custom-icon"></span>');
          }
        });
      });
    </script>

    <style>  
      .sortable, .not-sortable {
        padding: 10px 0;
        margin: 1px 0;
        width: 358px;
        text-align: center;
        color: #ffffff;
      }

      .sortable {
        background-color: #51A0ED;
      }

      .not-sortable {
        background-color: #8E8E8E;
        opacity: 0.5;
      }

      .disabled {
        background-color: #FF0000;
        opacity: 0.5;
      }

      .custom-hint{
        background-color: lightskyblue;
        padding: 10px 0;
        margin: 1px 0;
        width: 358px;
        color: darkblue;
        padding: 20px
      }

      .k-i-clock{
        margin-left: 5px;
      }
    </style>
```

## 1. Add an HTML Element

To initialize the Sortable, use an existing HTML element.

```html
	<div id="sortable"></div>   
```

## 2. Initialize the Sortable

In this step, you will initialize the Sortable from the `<div>` element.

```html
	<div id="sortable"></div> 
	
	<script>
		$("#sortable").kendoSortable()
	</script>

```

## 3. Add Sortable Items

Add more HTML elements inside the element from which the Sortable is initialized. 

```html
   <div id="sortable">
        <div class="sortable">Item 1</div>
        <div class="sortable">Item 2</div>  
        <div class="sortable disabled">Disabled item 1</div>
        <div class="sortable">Item 3</div>
        <div class="sortable">Item 4</div>  
        <div class="not-sortable">Not sortable item 1</div>
        <div class="not-sortable">Not sortable item 2</div>
        <div class="sortable disabled">Disabled item 2</div>
        <div class="sortable">Item 5</div>
        <div class="sortable">Item 6</div>
    </div>
```

## 4. Configure the Sortable Hint

The Sortable component gives you the option to customize the [`hint`](/api/javascript/ui/sortable/configuration/hint) that is rendered by default. 


```html
    <div id="sortable">
      <div class="sortable">Item 1</div>
      <div class="sortable">Item 2</div>  
      <div class="sortable disabled">Disabled item 1</div>
      <div class="sortable">Item 3</div>
      <div class="sortable">Item 4</div>  
      <div class="not-sortable">Not sortable item 1</div>
      <div class="not-sortable">Not sortable item 2</div>
      <div class="sortable disabled">Disabled item 2</div>
      <div class="sortable">Item 5</div>
      <div class="sortable">Item 6</div>
    </div>
    <script>
      $("#sortable").kendoSortable({
        hint: function(element) {            
          return $("<span class='custom-hint'></span>")
            .text(element.text() + ' custom hint text')
            .append('<span class="k-icon k-i-clock custom-icon"></span>');
        }
      })
    </script>
```

## 5. Configure the Cursor

You can set what type of [`cursor`](api/javascript/ui/sortable/configuration/cursor) will be displayed while the user drags a sortable item.


```html
       <div id="sortable">
      <div class="sortable">Item 1</div>
      <div class="sortable">Item 2</div>  
      <div class="sortable disabled">Disabled item 1</div>
      <div class="sortable">Item 3</div>
      <div class="sortable">Item 4</div>  
      <div class="not-sortable">Not sortable item 1</div>
      <div class="not-sortable">Not sortable item 2</div>
      <div class="sortable disabled">Disabled item 2</div>
      <div class="sortable">Item 5</div>
      <div class="sortable">Item 6</div>
    </div>

    <script>
      $(document).ready(function() {
        $("#sortable").kendoSortable({         
          cursor: "grab",
          hint: function(element) {            
            return $("<span class='custom-hint'></span>")
              .text(element.text() + ' custom hint text')
              .append('<span class="k-icon k-i-clock custom-icon"></span>');
          }
        });
      });
    </script>
```

## 6. Disable Items

You can specify which of the items in the Sortable are [`disabled`](/api/javascript/ui/sortable/configuration/disabled) and can not be dragged. The disabled items are valid drop targets.


```html
    <div id="sortable">
      <div class="sortable">Item 1</div>
      <div class="sortable">Item 2</div>  
      <div class="sortable disabled">Disabled item 1</div>
      <div class="sortable">Item 3</div>
      <div class="sortable">Item 4</div>  
      <div class="not-sortable">Not sortable item 1</div>
      <div class="not-sortable">Not sortable item 2</div>
      <div class="sortable disabled">Disabled item 2</div>
      <div class="sortable">Item 5</div>
      <div class="sortable">Item 6</div>
    </div>

    <script>
      $(document).ready(function() {
        $("#sortable").kendoSortable({          
          disabled: ".disabled",
          cursor: "grab",
          hint: function(element) {            
            return $("<span class='custom-hint'></span>")
              .text(element.text() + ' custom hint text')
              .append('<span class="k-icon k-i-clock custom-icon"></span>');
          }
        });
      });
    </script>
```

## 7. Filter Valid Drop Targets

Specify which of the items in the Sortable are valid drop targets by using the [`filter`](/api/javascript/ui/sortable/configuration/filter) configuration option. 


```html
    <div id="sortable">
      <div class="sortable">Item 1</div>
      <div class="sortable">Item 2</div>  
      <div class="sortable disabled">Disabled item 1</div>
      <div class="sortable">Item 3</div>
      <div class="sortable">Item 4</div>  
      <div class="not-sortable">Not sortable item 1</div>
      <div class="not-sortable">Not sortable item 2</div>
      <div class="sortable disabled">Disabled item 2</div>
      <div class="sortable">Item 5</div>
      <div class="sortable">Item 6</div>
    </div>

    <script>
     $(document).ready(function() {
        $("#sortable").kendoSortable({
          filter: ".sortable",
          disabled: ".disabled",
          cursor: "grab",
          hint: function(element) {            
            return $("<span class='custom-hint'></span>")
              .text(element.text() + ' custom hint text')
              .append('<span class="k-icon k-i-clock custom-icon"></span>');
          }
        });
     });
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Sortable](https://demos.telerik.com/kendo-ui/sortable/index)
* [Demo Page for the Sortable Grid Integration](https://demos.telerik.com/kendo-ui/sortable/integration-grid)

## See Also 

* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
* [Knowledge Base Section](/knowledge-base)


