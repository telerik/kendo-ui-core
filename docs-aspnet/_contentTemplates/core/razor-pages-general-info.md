#referencing-handler-methods
## Referencing Handler Methods in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by convention, the two files have the same name).

The `cshtml.cs` file, known as the `PageModel`, contains handler methods that respond to HTTP requests. These methods are prefixed with `On` followed by the HTTP verb (for example, `OnGet`, `OnPost`, `OnPostRead`, `OnPostCreate`).

Handler methods declared in a `PageModel` can be referenced from any Razor Page using one of the following URL patterns:

* Using `Url.Page()`

    ```C#
    Url.Page("PageName", "HandlerName")
    // OR
    Url.Page("/FolderName/PageName", "HandlerName")
    ```

    For example, `Url.Page("Index", "Read")` references the `OnPostRead` or `OnGetRead` handler method in the `Index.cshtml.cs` file.

* Using a query string

    ```C#
    Url("/PathToPage?handler=HandlerName")
    ```

    For example, `Url("/Index?handler=Read")` references the `OnPostRead` or `OnGetRead` handler method in the `Index` page.

For more information on Razor Pages architecture and concepts, refer to [the official Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/razor-pages/).
#end