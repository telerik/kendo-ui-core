namespace Kendo.Mvc
{
    using System.Collections.Generic;
    using System.Linq;

    public static class JsonObjectExtensions
    {
        public static IEnumerable<IDictionary<string, object>> ToJson(this IEnumerable<JsonObject> items)
        {            
            return items.Select(i => i.ToJson());         
        }
    }
}