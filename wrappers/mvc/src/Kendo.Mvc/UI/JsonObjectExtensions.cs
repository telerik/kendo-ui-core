namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Extensions;

    public static class JsonObjectExtension
    {
        public static IEnumerable<IDictionary<string, object>> ToJson(this IEnumerable<JsonObject> items)
        {
            var result = new List<IDictionary<string, object>>();

            items.Each(item =>
            {
                result.Add(item.ToJson());
            });

            return result;
        }
    }
}
