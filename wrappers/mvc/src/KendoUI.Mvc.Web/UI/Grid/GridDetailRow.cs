// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    
    public class GridDetailRow<T>
        where T : class
    {
        public GridDetailRow()
        {
            HtmlAttributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
        }

        public bool Expanded
        {
            get;
            set;
        }

        public IDictionary<string,object> HtmlAttributes 
        { 
            get; 
            private set; 
        }

        public string Html
        {
            get;
            set;
        }
    }
}
