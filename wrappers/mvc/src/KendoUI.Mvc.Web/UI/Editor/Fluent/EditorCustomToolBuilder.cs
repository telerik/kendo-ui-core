

namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using KendoUI.Mvc.Extensions;
    
    public class EditorCustomToolBuilder : IHideObjectMembers
    {
        private readonly EditorCustomTool tool;

        public EditorCustomToolBuilder(EditorCustomTool tool)
        {
            this.tool = tool;
        }

        public EditorCustomToolBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        public EditorCustomToolBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {
            tool.HtmlAttributes.Merge(attributes);
            return this;
        }

        public EditorCustomToolBuilder Template(Action template)
        {
            tool.Template.Content = template;
            return this;
        }

        public EditorCustomToolBuilder Template(Func<object, object> template)
        {
            tool.Template.InlineTemplate = template;
            return this;
        }

        public EditorCustomToolBuilder Html(string value)
        {
            tool.Template.Html = value;
            return this;
        }
    }
}
