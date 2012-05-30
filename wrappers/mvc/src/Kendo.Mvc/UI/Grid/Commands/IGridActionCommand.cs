namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Html;
using System.Web.Mvc;

    public interface IGridActionCommand
    {
        IDictionary<string, object> Serialize(IGridUrlBuilder urlBuilder);

        GridButtonType ButtonType { get; }
        
        string Name
        {
            get;
        }
        //TODO: Implement command button html attributes
        //IDictionary<string, object> HtmlAttributes
        //{
        //    get;
        //}

        //IDictionary<string, object> ImageHtmlAttributes
        //{
        //    get;
        //}

        IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);

        IEnumerable<IGridButtonBuilder> CreateEditButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);
        
        IEnumerable<IGridButtonBuilder> CreateInsertButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);
    }
}