namespace Kendo.Mvc.UI
{    
    public class GridSortableSettings : JsonObject
    {
        public GridSortableSettings()
        {
            AllowUnsort = true;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public GridSortMode SortMode
        {
            get;
            set;
        }

        public bool AllowUnsort
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!AllowUnsort)
            {
                json["allowUnsort"] = AllowUnsort;                
            }

            if (SortMode != GridSortMode.SingleColumn)
            {
                json["mode"] = "multiple";
            }
        }
    }
}