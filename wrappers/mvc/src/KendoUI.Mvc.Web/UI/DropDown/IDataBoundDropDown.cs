namespace Telerik.Web.Mvc.UI
{
    using System.Web.Mvc;

    public interface IDataBoundDropDown
    {
        IUrlGenerator UrlGenerator { get; set; }

        ViewContext ViewContext { get; }

        IDropDownDataBindingConfiguration DataBinding { get; }
    }
}
