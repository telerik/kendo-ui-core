namespace Kendo.Mvc.UI.Html
{
    internal static class GridItemExtensions
    {
        public static void AsAlternating(this GridItem item)
        {
            if (item.Index % 2 != 0)
            {
                item.State |= GridItemStates.Alternating;
            }
        }
    }
}