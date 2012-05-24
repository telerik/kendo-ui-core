namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IDropDown : IDataBoundDropDown, IDropDownRenderable
    {
        IDictionary<string, object> DropDownHtmlAttributes { get; }

        Effects Effects { get; }

        string Placeholder { get; set; }

        string CascadeTo { get; set; }
    }
}
