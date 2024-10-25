---
title: Getting Started with External Templates 
page_title: Getting Started with External Templates - Kendo UI Templates
description: "Get started with the jQuery Templates by Kendo UI and learn how to create an external template, use it to display data, and render data based on a condition."
slug: getting_started_external_templates
position: 3
---

# Getting Started with the External Kendo UI Templates

This guide demonstrates how to define a Kendo UI Template by using HTML script blocks, which is suitable for larger templates which include logic or HTML markup. Since external templates live in HTML instead of JavaScript, they are easier for designers to create and modify.

After the completion of this guide, you will be able to create an external template, use it to display data, and render data based on a condition, as demonstrated in the following example:

```dojo
    <style>
      .product-item{
        margin: 20px;
      }
    </style>
    
    <div id="container"></div>

    <script type="text/x-kendo-template" id="myTemplate">
    	<div class="product-item">
        #if(isShipped){#
            <div><b>#: product #</b> are shipped</div>
        #}else{#
            <div><b>#: product #</b> are not shipped yet</div>
        #}#

        <div><i>Available colors: </i></div>

         # for (var j = 0; j < colors.length; j++) { #
          <span style="color:#= colors[j] #">#= colors[j] #</span>
         # } #
      </div>
    </script>

    <script type="text/javascript">
		var data = [
		    { product: "Dresses", isShipped: true, colors: ['red', 'pink', 'blue'] },
			{ product: "T-shirts", isShipped: false, colors: ['green', 'orange', 'blue', 'purple'] },
			{ product: "Trousers", isShipped: true, colors: ['brown', 'lime', 'lightblue'] },
		];

		var templateContent = $("#myTemplate").html();
		var template = kendo.template(templateContent);	
		var result = kendo.render(template, data); 		
		$("#container").html(result); 
    </script>
```

## 1. Define the External Template

First, define an external template by setting up a script block in your HTML with the `text/x-kendo-template` type. 

> The type of `text/x-kendo-template` is not explicitly required. When using Visual Studio, you can maintain Syntax Highlighting by setting the type to `text/html`. Except for `text/javascript` if the type is not used as a template, you can use virtually any value to prevent the browser from rendering the block at runtime.

```
    <script type="text/x-kendo-template">
        <!--Template content here-->
    </script>
```

## 2. Add and id to the Template Script 

Next, add an `id` to the template script as external templates always have to have an ID thus enabling you to select their content when initializing in JavaScript.

```
    <script type="text/x-kendo-template" id="myTemplate">
        
    </script>
```

## 3. Create Some Dummy Data

Let's now add some sample data that you will later use in the Template:

```
    <script type="text/x-kendo-template" id="myTemplate">
        <!--Template content here-->
    </script>

    <script type="text/javascript">        
        var data = [
          { product: "Dresses", isShipped: true, colors: ['red', 'pink', 'blue'] },
          { product: "T-shirts", isShipped: false, colors: ['green', 'orange', 'blue', 'purple'] },
          { product: "Trousers", isShipped: true, colors: ['brown', 'lime', 'lightblue'] },
        ];
    </script>
```

## 4. Conditionally Display and Format the Data  

By using the Template, let's now display different text depending on a boolean property, for example, the `isShipped` property.

```
    <script type="text/x-kendo-template" id="myTemplate">
        	<div class="product-item">
            #if(isShipped){#
                <div><b>#: product #</b> are shipped</div>
            #}else{#
                <div><b>#: product #</b> are not shipped yet</div>
            #}#
    </script>

    <script type="text/javascript">        
        var data = [
          { product: "Dresses", isShipped: true, colors: ['red', 'pink', 'blue'] },
          { product: "T-shirts", isShipped: false, colors: ['green', 'orange', 'blue', 'purple'] },
          { product: "Trousers", isShipped: true, colors: ['brown', 'lime', 'lightblue'] },
        ];
    </script>
```

## 5. Add HTML and Compile the Template

You can now add an element that will contain the Template HTML and, then, compile the Template.

```
    <div id="container"></div>

    <script type="text/x-kendo-template" id="myTemplate">
        	<div class="product-item">
            #if(isShipped){#
                <div><b>#: product #</b> are shipped</div>
            #}else{#
                <div><b>#: product #</b> are not shipped yet</div>
            #}#
    </script>

    <script type="text/javascript">        
        var data = [
          { product: "Dresses", isShipped: true, colors: ['red', 'pink', 'blue'] },
          { product: "T-shirts", isShipped: false, colors: ['green', 'orange', 'blue', 'purple'] },
          { product: "Trousers", isShipped: true, colors: ['brown', 'lime', 'lightblue'] },
        ];

        // Extract the template content from script tag.
        var templateContent = $("#myTemplate").html();

        // Compile a template.
		var template = kendo.template(templateContent);				
		var result = kendo.render(template, data); //render the template			
		$("#container").html(result); //append the result to the page
    </script>
```

## 6. Add More JavaScript

Within an external template, you can add any HTML and JavaScript as long as the JavaScript is properly formatted with the Kendo UI Template syntax.

The example below demonstrates how to iterate over the items in the `colors` array and add an element with a custom style for each item.

```
    <script type="text/x-kendo-template" id="myTemplate">
    	<div class="product-item">
        #if(isShipped){#
            <div><b>#: product #</b> are shipped</div>
        #}else{#
            <div><b>#: product #</b> are not shipped yet</div>
        #}#

        <div><i>Available colors: </i></div>

         # for (var j = 0; j < colors.length; j++) { #
          <span style="color:#= colors[j] #">#= colors[j] #</span>
         # } #
      </div>
    </script>
```

This is it! Now you are ready to dive more deeply into the Kendo UI Templates and use them in more advanced and complex scenarios!

## Next Steps

* [Loading Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [Demo Page for the Kendo UI Templates](https://demos.telerik.com/kendo-ui/templates/index)

## See Also

* [Getting Started with the Inline Templates]({% slug getting_started_inline_templates %})
* [Templates Performance]({% slug performance_kendoui_templatescomponent %})
* [Templates JavaScript API Reference](/api/javascript/kendo/methods/template)
* [Knowledge Base Section](/knowledge-base)


<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>