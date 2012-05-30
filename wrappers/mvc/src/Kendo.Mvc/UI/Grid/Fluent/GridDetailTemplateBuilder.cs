namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;
    
    public class GridDetailTemplateBuilder<T> : IHideObjectMembers
        where T : class
    {
        private readonly IGridDetailTemplate<T> detailView;

        public GridDetailTemplateBuilder(IGridDetailTemplate<T> detailView)
        {
            this.detailView = detailView;
        }

        public GridDetailTemplateBuilder<T> Template(Action<T> value)
        {
            detailView.Template.CodeBlockTemplate = value;

            return this;
        }

        public GridDetailTemplateBuilder<T> Template(Func<T, object> value)
        {
            detailView.Template.InlineTemplate = value;

            return this;
        }

        public GridDetailTemplateBuilder<T> ClientTemplate(string value)
        {
            detailView.ClientTemplate = value;
            
            return this;
        }
    }
}
