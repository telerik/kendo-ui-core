---
title: Known Exceptions
page_title: Known Exceptions Troubleshooting
description: "Learn about the known exceptions you might come across while working with Kendo UI Grid for ASP.NET MVC."
slug: knownexceptions_gridhelper_aspnetmvc
position: 3
---

# Known Exceptions

This article provides solutions for some known exceptions you might encounter while working with the Telerik UI Grid HtmlHelper for {{ site.framework }}.

## Circular Reference Detected While Serializing an Object of Type

The reason for this exception is that the [`JavaScriptSerializer`](https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.aspx) class used by the [`Json`](https://msdn.microsoft.com/en-us/library/system.web.mvc.controller.json.aspx) method cannot serialize object graphs which contain circular references (refer to each other).

**Solution** Use View Model objects and avoid serializing the properties which create the circular reference. For further information on this issue, refer to the [article on avoiding circular reference exceptions](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/faq#how-to-avoid-circular-reference-exceptions).

## JSON JavaScriptSerializer Serialization or Deserialization Error

This exception is thrown when the length of the JSON response exceeds the default [`MaxJsonLength`](https://msdn.microsoft.com/en-us/library/system.web.script.serialization.javascriptserializer.maxjsonlength.aspx).

**Solution** To fix this issue, use any of the following suggestions:

* Enable paging by calling the `Pageable` method.
* Serialize only the required properties of your model by [using a View Model](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/faq#how-to-convert-my-models-to-view-model-objects).
* Manually serialize the `DataSourceResult`.

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            var data = GetData();
            var serializer = new JavaScriptSerializer();
            var result = new ContentResult();
            serializer.MaxJsonLength = Int32.MaxValue; // Whatever max length you want here
            result.Content = serializer.Serialize(data.ToDataSourceResult(request));
            result.ContentType = "application/json";
            return result;
        }

## Sensitive Information Error Message

An exception that a request has been blocked because sensitive information could be disclosed to third-party web sites when this is used in a `GET` request would be thrown when the `kendo.aspnetmvc.min.js` is not included or is included before the `kendo.all.min.js`.

Yet another reason is that you explicitly specified that the Grid should make HTTP `GET` requests via the `Type` setting but did not allow HTTP `GET` requests.

**Solution** Allow `GET` requests.

    // View
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
        .Read(read => read.Action("Read", "Home").Type(HttpVerbs.Get)) // tell the DataSource to make GET requests
    // Omitted for brevity.
    // Controller
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var data = GetData();

        return Json(result.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
    }

## Limited Usage of Templates

{% if site.core %}
    Тhe Grid for Core is not rendered on the server. Therefore, it is not possible to define server-side templates (like Group Header Templates) which makes the usage of `.ServerOperations(true)` in this case incompatible.
{% else %}
    An exception that templates can be used only with field access, property access, single-dimension array index, or single-parameter custom indexer expressions can occur if an editable Grid is bound to a `DataTable` or `DataSet`. The reason is that the ASP.NET MVC `EditorFor` method does not support `DataTable`.

**Solution** Use a popup edit form with a custom editor template.

For more information on how to resolve this issue, refer to the following resources:
* [Popup editing in the Telerik UI for ASP.NET MVC Grid HtmlHelper (demo)](https://demos.telerik.com/aspnet-mvc/grid/editing-popup)
* [Binding to a DataTable by the Telerik UI for ASP.NET MVC Grid HtmlHelper (how-to online example)](/helpers/grid/how-to/Binding/grid-bind-to-datatable)
* [Editor templates in the Telerik UI for ASP.NET MVC Grid HtmlHelper]({% slug editortemplates_grid_aspnetcore %})&mdash;use a separate editor template for each data field.
* [The TemplateName setting in the Telerik UI for ASP.NET MVC Grid HtmlHelper](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder#methods-TemplateName(System.String))&mdash;use it
to set a single edit form template for the whole edit form.
{% endif %}

## Invalid Template Error When Nesting Client Templates

The Kendo UI widgets are unable to detect if they are used in nested client template scenarios. Such a setup requires the escaping of the `#` literals and the closing `</script>` tags in the HTML markup and JavaScript initialization statements of the nested widgets. However, this cannot happen automatically. As a result, nested client template scenarios are not supported out-of-the-box.

**Cause** Consider the following scenario:

* Grid **A** is placed in a View. Grid **A** has a popup edit template.
* Grid **B** is placed in a partial view, which represents the popup edit template of Grid **A**.
* A Kendo UI widget **C** is placed in the same partial view as Grid **B**. The widget **C** belongs to the client detail template of the Grid **B**.

In the above scenario, the widget **C** will not be rendered correctly and will cause an `Invalid template` JavaScript error.

**Solution** To avoid the JavaScript error:

1. Move the declaration of widget **C** to a separate partial view.
1. Render the partial view in the main View where Grid **A** is defined. In this case widget **C** will not exist in a nested template context and its HTML/JavaScript output will not need any escaping.

## See Also

* [Basic Usage of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid)
* [Using the API of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid/api)
* [Server-Side API](/api/grid)
