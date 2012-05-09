namespace Kendo.Mvc.UI
{
    using Extensions;

    public static class GridBindingContextExtensions
    {
        public static T GetGridParameter<T>(this IGridBindingContext context, string key)
        {
            return context.Controller.ValueOf<T>(context.Prefix(key));
        }
    }
}