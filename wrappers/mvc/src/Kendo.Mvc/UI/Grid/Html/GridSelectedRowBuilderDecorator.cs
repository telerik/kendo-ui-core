namespace Kendo.Mvc.UI.Html
{
    public class GridSelectedRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        public override bool ShouldDecorate(GridItem gridItem)
        {
            return (gridItem.State & GridItemStates.Selected) == GridItemStates.Selected
                    && gridItem.Type != GridItemType.DetailRow
                   && gridItem.Type != GridItemType.EmptyRow &&
                   gridItem.Type != GridItemType.GroupRow;
        }

        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            htmlNode.AddClass(UIPrimitives.SelectedState);
        }
    }
}