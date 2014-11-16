namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class PivotDataSourceMeasureDescriptor : JsonObject
    {
        public string Name { get; set; }
        public string Type { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (Name != null)
            {
                json["name"] = Name;
            }

            if (Type != null)
            {
                json["type"] = Type;
            }
        }
    }
}