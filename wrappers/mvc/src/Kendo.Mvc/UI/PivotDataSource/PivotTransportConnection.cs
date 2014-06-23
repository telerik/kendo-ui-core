namespace Kendo.Mvc.UI
{
    public class PivotTransportConnection : JsonObject
    {
        public PivotTransportConnection()
        {
        }

        public string Catalog { get; set; }
        public string Cube { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!string.IsNullOrEmpty(Catalog))
            {
                json["catalog"] = Catalog;
            }

            if (!string.IsNullOrEmpty(Cube))
            {
                json["cube"] = Cube;
            }
        }
    }
}