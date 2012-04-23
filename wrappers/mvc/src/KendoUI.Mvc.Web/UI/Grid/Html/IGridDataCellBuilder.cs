// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    
    public interface IGridDataCellBuilder : IGridDecoratableCellBuilder
    {
        string Html
        {
            get;
            set;
        }
        
        IHtmlNode CreateCell(object dataItem);

        IDictionary<string, object> HtmlAttributes
        {
            get;
        }

        Action<object> Callback
        {
            get;
            set;
        }
    }
}