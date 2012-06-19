namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;
    
    public class GridButtonImageDecorator : IGridButtonBuilderDecorator
    {
        private readonly IGridButtonBuilder button;

        public GridButtonImageDecorator(IGridButtonBuilder button)
        {
            this.button = button;
        }

        public void Apply(IHtmlNode parent)
        {
            var span = new HtmlElement("span");

            span.Attributes(button.ImageHtmlAttributes);
            if (button.SpriteCssClass.HasValue())
            {
                span.AddClass(UIPrimitives.Icon, button.SpriteCssClass);
            }                

            span.AppendTo(parent);
        }
    }
}