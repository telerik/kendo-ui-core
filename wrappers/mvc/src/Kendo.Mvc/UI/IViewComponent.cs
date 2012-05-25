namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IViewComponent : IHtmlAttributesContainer
    {
        string Id { get; }

        string Name { get; }

        ViewContext ViewContext { get; }

        ViewDataDictionary ViewData { get; }
    }
}
