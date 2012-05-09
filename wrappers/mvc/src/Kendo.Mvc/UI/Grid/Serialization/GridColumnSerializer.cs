namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    class GridColumnSerializer : IGridColumnSerializer
    {
        private readonly IGridColumn column;
        
        public GridColumnSerializer(IGridColumn column)
        {
            this.column = column;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            IDictionary<string, object> result = new Dictionary<string, object>();
            FluentDictionary.For(result)
                  .Add("attr", column.HtmlAttributes.ToAttributeString(), () => column.HtmlAttributes.Any())
                  .Add("title", column.Title)
                  .Add("hidden", column.Hidden, false)
                  .Add("includeInContextMenu", column.IncludeInContextMenu, () => !column.IncludeInContextMenu)
                  .Add("width", column.Width, () => column.Hidden && !string.IsNullOrEmpty(column.Width));

            if (column.ClientTemplate.HasValue())                  
            {
                result.Add("template", Encode(column, column.ClientTemplate));
            }

            if (column.ClientFooterTemplate.HasValue())
            {
                result.Add("footerTemplate", Encode(column, column.ClientFooterTemplate));
            }

            return result;
        }

        protected string Encode(IGridColumn column, string template)
        {
            return column.Grid.IsSelfInitialized ? template.Replace("<", "%3c").Replace(">", "%3e") : template;
        }
    }
}
