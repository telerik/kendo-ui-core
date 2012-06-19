namespace Kendo.Mvc.UI
{
    public class GridFilterableSettings : JsonObject
    {
        public GridFilterableSettings()
        {
            Extra = true;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool Extra
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!Extra)
            {
                json["extra"] = false;
            }
        }
    }
}