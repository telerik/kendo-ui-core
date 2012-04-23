// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI.Html;
using System.Web.Mvc;

    public interface IGridActionCommand
    {
        IDictionary<string, object> Serialize(IGridUrlBuilder urlBuilder);

        GridButtonType ButtonType { get; }
        
        string Name
        {
            get;
        }

        IDictionary<string, object> HtmlAttributes
        {
            get;
        }

        IDictionary<string, object> ImageHtmlAttributes
        {
            get;
        }

        IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);

        IEnumerable<IGridButtonBuilder> CreateEditButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);
        
        IEnumerable<IGridButtonBuilder> CreateInsertButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);
    }
}