namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IWidget : IHtmlAttributesContainer
    {
        string Id { get; }

        string Name { get; }

        string PropertyFieldName { get; }

        ViewContext ViewContext { get; }

        ViewDataDictionary ViewData { get; }
    }
}
