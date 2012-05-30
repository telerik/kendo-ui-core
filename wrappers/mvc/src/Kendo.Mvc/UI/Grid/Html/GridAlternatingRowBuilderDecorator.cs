namespace Kendo.Mvc.UI.Html
{
    public class GridAlternatingRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem gridItem)
        {
            return (gridItem.State & GridItemStates.Alternating) == GridItemStates.Alternating 
                   && gridItem.Type != GridItemType.EmptyRow &&
                   gridItem.Type != GridItemType.GroupRow;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            htmlNode.AddClass(UIPrimitives.Alt);
        }
    }
}