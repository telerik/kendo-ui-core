---
title: Getting Started with CSP Templates
page_title: Getting Started with Content Security Policy (CSP) Templates - Kendo UI Templates
description: "Learn about the Content Security Policy (CSP) templates and how to implement and use them when working with Kendo UI for jQuery."
slug: csp_templates
position: 1
---

# Getting Started with Content Security Policy (CSP) Templates

The Kendo UI for jQuery R1 2023 release addresses the [content security policy issues]({% slug troubleshooting_content_security_policy_kendoui %}) related to the `usafe-eval` directive for all its components except for the Spreadsheet. 

To avoid including the `unsafe-eval` keyword in the `meta` tag of your project pages, in this way preventing the components from being dependent on `unsafe-eval`, you must rewrite all [inline]({% slug getting_started_inline_templates %}) and [external]({% slug getting_started_external_templates %}) templates into CSP-compatible functional templates.

> The MVVM pattern works only with external templates, thus the CSP compatible templates cannot be used in an MVVM scenario.

This guide demonstrates how to [define single-line functional CSP templates](#creating-single-line-templates), also [specify CSP templates with simple operations](#creating-templates-with-simple-operations) and [complex logic](#creating-templates-with-complex-logic), as well as [convert existing templates into CSP-compatible ones](#converting-existing-templates-to-csp-compatible-templates).

## Creating Single-Line Templates

To create a single-line functional template: 

1. First, create the template by using [string literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

    ```javascript
        var htmlEncode = kendo.htmlEncode; // (Optional) To encode the values, use the kendo.htmlEncode method. This is the equivalent to using the #: param # approach.
        // Write the template as a function that returns 
        var templateString = ({ firstName, age }) => `<b>Name: ${htmlEncode(firstName)}</b> --> Age: <i> ${htmlEncode(age)} </i>`;
    ```

1. Next, compile the inline template to a function that builds HTML by using the Kendo UI [`template`](/api/javascript/kendo/methods/template) method.

    ```javascript
        var data = { firstName: "Todd", age: 16 };
        var template = kendo.template(templateString);
        var result = template(data); 
    ```

1. Display the returned HTML. 

    ```javascript
        $("#example").html(result); 
    ```

The following example demonstrates the implemented approach for creating a simple, single-line template:

```dojo
    <div id="example"></div>
    <script>
      var htmlEncode = kendo.htmlEncode;
      var templateString = ({ firstName, age }) => `<b>Name: ${htmlEncode(firstName)}</b> --> Age: <i> ${htmlEncode(age)} </i>`;

      var data = { firstName: "Todd", age: 16 };
      var template = kendo.template(templateString);
      var result = template(data); 
      $("#example").html(result); 
    </script>
```
    
## Creating Templates with Simple Operations

The functional templates enable you to iterate over arrays of data and perform simple conditional checks directly in the string literal. To accomplish this scenario, use the [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method and the [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

```dojo
    <div id="example"></div>
    <script>
      var templateString = ({ people }) => `
      People under 20:<ul>${people.map(person => person.age < 20 ? '<li>Name: ' + person.firstName + ' Age: ' + person.age + '</li>' : '').join("")}</ul>
      
      People over 20:<ul>${people.map(person => person.age > 20 ? '<li>Name: ' + person.firstName + ' Age: ' + person.age + '</li>' : '').join("")}</ul>`;

      var data = {
        people: [
          { firstName: "Todd", age: 16 },
          { firstName: "Mike", age: 23 },
          { firstName: "Amanda", age: 21},
          { firstName: "Stacy", age: 19}
        ]
      };
      var template = kendo.template(templateString);
      var result = template(data); 
      $("#example").html(result); 
    </script>
```

## Creating Templates with Complex Logic

To create templates that have more complex logic, write them as functions with a body.

```dojo
    <div id="example"></div>
    <script>
      var templateString = ({ people }) => {
        var result = "<ul>";
        
        for(let i=0; i<people.length; i++) {
          let person = people[i];
          
          if(person.age > 20) {
            if(person.driver) {
              result += `<li style='color: green;'>Name: ${person.firstName} Age: ${person.age} is a driver.</li>`;
            } else {
              result += `<li style='color: blue;'>Name: ${person.firstName} Age: ${person.age}</li>`;
            }
          } else {
            result += `<li style='color: red;'>Name: ${person.firstName} Age: ${person.age}</li>`;
          }
        }
        
        result += "</ul>";
        
        return result;
      };

      var data = {
        people: [
          { firstName: "Todd", age: 16 },
          { firstName: "Mike", age: 23, driver: true },
          { firstName: "Amanda", age: 21},
          { firstName: "Stacy", age: 19}
        ]
      };
      var template = kendo.template(templateString);
      var result = template(data); 
      $("#example").html(result); 
    </script>
```

## Converting Existing Templates to CSP-Compatible Templates

You can also convert your existing templates into CSP-compatible ones, for example, an existing Grid [column template](/api/javascript/ui/grid/configuration/columns.template) into a CSP-compatible one.

The following snippet demonstrates the previously used approach for defining the template in the specific scenario. 

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
          columns: [ {
            field: "name",
            template: '<span style="color:red;"><strong>#: name #</strong></span>'
          }],
          dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
        });
    </script>
```

The next snippet shows the new approach for defining a CSP column template in the Grid. 

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
          columns: [ {
            field: "name",
            template: ({ name }) => `<span style="color:red;"><strong>${kendo.htmlEncode(name)}</strong></span>`
          }],
          dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
        });
    </script>
```

The examples that follow illustrate another scenario&mdash;converting a Scheduler [`eventTemplate`](/api/javascript/ui/scheduler/configuration/eventtemplate) into a CSP-compatible template.

The following snippet demonstrates the previously used approach for defining the template in the specific scenario. 

```dojo
    <script id="event-template" type="text/x-kendo-template">
  		<div>Title: #: title #</div>
  		<div>Atendees:
        # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
        # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        eventTemplate: $("#event-template").html(),
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview",
            atendees: [1,2]
          }
        ],
        resources: [
          {
            field: "atendees",
            dataSource: [
              { value: 1, text: "Alex" },
              { value: 2, text: "Bob" }
            ],
            multiple: true
          }
        ]
      });
    </script>
```

The next snippet shows the new approach for defining a CSP event template in the Scheduler. 

```dojo
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        eventTemplate: ({ resources, title }) => `<div>Title: ${kendo.htmlEncode(title)}</div>\
        <div>Atendees: ${resources.map(resource => resource.text).join(" ")}</div>`,
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview",
            atendees: [1,2]
          }
        ],
        resources: [
          {
            field: "atendees",
            dataSource: [
              { value: 1, text: "Alex" },
              { value: 2, text: "Bob" }
            ],
            multiple: true
          }
        ]
      });
    </script>
```

## Next Steps

* [Loading Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [Demo Page for the Kendo UI Templates](https://demos.telerik.com/kendo-ui/templates/index)

## See Also

* [Getting Started with the Inline Templates]({% slug getting_started_inline_templates %})
* [Getting Started with the External Templates]({% slug getting_started_external_templates %})
* [Templates Performance]({% slug performance_kendoui_templatescomponent %})
* [Templates JavaScript API Reference](/api/javascript/kendo/methods/template)
* [Knowledge Base Section](/knowledge-base)