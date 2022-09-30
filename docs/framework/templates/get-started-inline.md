---
title: Getting Started with Inline Templates 
page_title: Getting Started with Inline Templates - Kendo UI for jQuery Templates 
description: "Get started with the jQuery Templates by Kendo UI and learn how to create and compile an inline template and display the returned HTML result."
slug: getting_started_inline_templates
position: 2
---

# Getting Started with the Inline Kendo UI Templates

This guide demonstrates how to define a Kendo UI Template by using JavaScript strings, which are suitable for small templates.

After the completion of this guide, you will be able to create and compile an inline template and display the returned HTML result, as demonstrated in the following example:

```dojo
    <div id="example"></div>
    <script>
      var templateString = "<b>Name: #: firstName #</b> --> Age: <i> #: age # </i>";
      
      var data = { firstName: "Todd", age: 16 };
      var template = kendo.template(templateString);
      var result = template(data); 
      $("#example").html(result); 
    </script>
```

## 1. Create the Inline Template 

First, create the inline template by setting up a JavaScript string.

```
    var templateString = "<b>Name: #: firstName #</b> --> Age: <i> #: age # </i>";
    var template = kendo.template(templateString);
```

## 2. Compile the Template

Next, compile the inline template to a function that builds HTML by using the Kendo UI [`template`](/api/javascript/kendo/methods/template) method.
    
```
    var data = { firstName: "Todd", age: 16 };
    var template = kendo.template(templateString);
    var result = template(data);
```

## 3. Display the Returned HTML  

You can now display the returned HTML. In the example below, the returned HTML from the template is set as a content to a `div#example` element. 

```
    $("#example").html(result);
```

This is it! Now you are ready to dive more deeply into the Kendo UI Templates, learn how to define external templates, and use them in more advanced and complex scenarios!

## Next Steps

* [Loading Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [Demo Page for the Kendo UI Templates](https://demos.telerik.com/kendo-ui/templates/index)

## See Also

* [Getting Started with the External Templates]({% slug getting_started_external_templates %})
* [Templates Performance]({% slug performance_kendoui_templatescomponent %})
* [Templates JavaScript API Reference](/api/javascript/kendo/methods/template)
* [Knowledge Base Section](/knowledge-base)


<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>