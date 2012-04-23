// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Data;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;

    internal class GridRowViewDataKey : IGridDataKey<DataRowView>
    {
        public GridRowViewDataKey(string memberName)
        {
            RouteKey = "id";
            Name = memberName;
        }

        public string Name
        {
            get;
            private set;
        }

        public string RouteKey
        {
            get;
            set;
        }

        public object GetValue(object dataItem)
        {
            return ((DataRowView)dataItem)[Name];
        }


#if MVC2 || MVC3
        public string HiddenFieldHtml(HtmlHelper<DataRowView> htmlHelper)
        {
            return htmlHelper.Hidden(Name, null, new { id = "" }).ToString();
        }
#endif

    }
}