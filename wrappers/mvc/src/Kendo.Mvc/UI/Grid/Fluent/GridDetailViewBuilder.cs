namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;
    
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
