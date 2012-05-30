namespace Kendo.Mvc.UI
{
    public class GridFilteringSettings : JsonObject
    {
        public GridFilteringSettings()
        {
            ShowOrOption = true;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool ShowOrOption
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!ShowOrOption)
            {
                json["extra"] = false;
            }
        }
    }
}