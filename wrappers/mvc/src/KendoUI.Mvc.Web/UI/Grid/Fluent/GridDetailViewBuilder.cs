// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Telerik.Web.Mvc.UI;
    
    public class GridDetailViewBuilder<T> : IHideObjectMembers
        where T : class
    {
        private readonly IGridDetailView<T> detailView;

        public GridDetailViewBuilder(IGridDetailView<T> detailView)
        {
            this.detailView = detailView;
        }

        public GridDetailViewBuilder<T> Template(Action<T> value)
        {
            detailView.Template.CodeBlockTemplate = value;

            return this;
        }
        
        public GridDetailViewBuilder<T> Template(Func<T, object> value)
        {
            detailView.Template.InlineTemplate = value;

            return this;
        }
        
        public GridDetailViewBuilder<T> ClientTemplate(string value)
        {
            detailView.ClientTemplate = value;
            
            return this;
        }
    }
}
