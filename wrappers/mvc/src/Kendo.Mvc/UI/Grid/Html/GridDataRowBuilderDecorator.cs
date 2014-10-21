namespace Kendo.Mvc.UI.Html
{
    public class GridDataRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem gridItem)
        {
            return gridItem.Type != GridItemType.DetailRow && gridItem.Type != GridItemType.GroupRow;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            if (htmlNode is HtmlFragment)
            {
                foreach (var node in htmlNode.Children)
                {
                    node.Attributes(CurrentGridItem.HtmlAttributes);
                }
            }
            else
            {
                htmlNode.Attributes(CurrentGridItem.HtmlAttributes);
            }
        }
    }
}