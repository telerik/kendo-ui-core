namespace Kendo.Mvc.UI.Html
{
    public class GridButtonTextDecorator : IGridButtonBuilderDecorator
    {
        private readonly IGridButtonBuilder button;

        public GridButtonTextDecorator(IGridButtonBuilder button)
        {
            this.button = button;
        }

        public void Apply(IHtmlNode parent)
        {
            var text = new LiteralNode(button.Text);
            text.AppendTo(parent);
        }
    }
}
