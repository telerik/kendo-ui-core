// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;
    using System;

    public interface IGridHtmlHelper
    {
        IHtmlNode HiddenForDataKey(object dataItem);

        IHtmlNode EditorForModel(object dataItem, string templateName, IEnumerable<Action<IDictionary<string, object>, object>> foreignKeyData, object additionalViewData);
    }
}
