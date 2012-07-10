namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    
    public class EditorCustomTemplateToolBuilder : IHideObjectMembers
    {
        private readonly EditorCustomTemplateTool tool;

        public EditorCustomTemplateToolBuilder(EditorCustomTemplateTool tool)
        {
            this.tool = tool;
        }

        public EditorCustomTemplateToolBuilder Template(string value)
        {
            tool.Template = value;
            return this;
        }
    }

    public class EditorCustomButtonToolBuilder : IHideObjectMembers
    {
        private readonly EditorCustomButtonTool tool;

        public EditorCustomButtonToolBuilder(EditorCustomButtonTool tool)
        {
            this.tool = tool;
        }

        //public EditorCustomButtonToolBuilder HtmlAttributes(object attributes)
        //{
        //    return HtmlAttributes(attributes.ToDictionary());
        //}

        //public EditorCustomButtonToolBuilder HtmlAttributes(IDictionary<string, object> attributes)
        //{
        //    tool.HtmlAttributes.Merge(attributes);
        //    return this;
        //}

        public EditorCustomButtonToolBuilder Name(string value)
        {
            tool.Name = value;
            return this;
        }

        public EditorCustomButtonToolBuilder Exec(Func<object, object> handler)
        {
            tool.Exec.TemplateDelegate = handler;

            return this;
        }

        public EditorCustomButtonToolBuilder Exec(string handler)
        {
            tool.Exec.HandlerName = handler;

            return this;
        }

        public EditorCustomButtonToolBuilder ToolTip(string value)
        {
            tool.ToolTip = value;
            return this;
        }
    }

}