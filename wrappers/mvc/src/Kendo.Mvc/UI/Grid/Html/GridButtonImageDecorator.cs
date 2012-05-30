namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;
    
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

            span.Attributes(button.ImageHtmlAttributes).AddClass(UIPrimitives.Icon, button.SpriteCssClass);

            span.AppendTo(parent);
        }
    }
}