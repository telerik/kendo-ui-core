namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class SchedulerGroupSettings : JsonObject
    {
        public SchedulerGroupSettings()
        {
            Resources = new string[0];
        }

        public string[] Resources
        {
            get;
            set;
        }

        public SchedulerGroupOrientation Orientation
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Resources.Length > 0)
            {
                json["resources"] = Resources;
            }

            if (Orientation != SchedulerGroupOrientation.Default)
            {
                json["orientation"] = Orientation;
            }
        }
    }
}
