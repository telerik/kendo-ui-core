// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web;

    public class GridDetailView<TModel> : IGridDetailView<TModel>
        where TModel : class
    {
        public GridDetailView()
        {
            Template = new HtmlTemplate<TModel>();
        }

        private string clientTemplate;

        public string ClientTemplate
        {
            get
            {
                return clientTemplate;
            }
            set
            {
                clientTemplate = HttpUtility.HtmlDecode(value);
            }
        }

        public HtmlTemplate<TModel> Template
        {
            get;
            private set;
        }
    }
}
