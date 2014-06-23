namespace Kendo.Mvc.UI
{
    public class PivotDataSourceColumn : JsonObject
    {
        public PivotDataSourceColumn()
        {
        }

        public string Name { get; set; }
        public bool Expand { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            json["name"] = Name;
            if (Expand)
            {
                json["expand"] = Expand;
            }
        }
    }
}