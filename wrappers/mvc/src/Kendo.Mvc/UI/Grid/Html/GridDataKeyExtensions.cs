namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;

    public static class GridDataKeyExtensions
    {
        public static string GetCurrentValue(this IGridDataKey dataKey, IValueProvider valueProvider)
        {
            var value = valueProvider.GetValue(dataKey.RouteKey);

            if (value != null)
            {
                return value.AttemptedValue;
            }

            return null;
        }
    }
}
