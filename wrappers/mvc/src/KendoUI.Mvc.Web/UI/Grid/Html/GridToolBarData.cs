// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.


namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;
    
    public class GridToolBarData
    {
        public IEnumerable<IGridActionCommand> Commands 
        { 
            get; 
            set; 
        }

        public IGridUrlBuilder UrlBuilder
        {
            get;
            set;
        }

        public IGridLocalization Localization 
        { 
            get; 
            set; 
        }

        public HtmlTemplate Template
        {
            get;
            set;
        }
    }
}
