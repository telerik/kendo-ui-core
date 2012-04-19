namespace KendoUI.Mvc.UI
{
    using System.Web.Mvc;

    public interface IViewComponent
    {
        string Id { get; }

        string Name { get; }

        ViewContext ViewContext { get; }
    }
}
