// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;

    public class GridItem
    {
        public GridItem()
        {
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            DetailRowHtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
        }

        public GridItemType Type
        {
            get;
            set;
        }

        public object DataItem
        {
            get;
            set;
        }

        public int GroupLevel
        {
            get; 
            set;
        }

        public GridItemStates State
        {
            get;
            set;
        }

        public int Index
        {
            get; 
            set;
        }

        public IDictionary<string, object> DetailRowHtmlAttributes
        {
            get;
            set;
        }        
        
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }

        public virtual bool Expanded
        {
            get;
            set;
        }

        public string DetailRowHtml
        {
            get;
            set;
        }
    }
}