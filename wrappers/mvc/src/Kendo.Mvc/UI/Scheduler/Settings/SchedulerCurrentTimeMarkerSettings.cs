namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class SchedulerCurrentTimeMarkerSettings : JsonObject
    {
        public SchedulerCurrentTimeMarkerSettings()
        {
            Enabled = true;
            UseLocalTimezone = true;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public int? UpdateInterval 
        {
            get;
            set;
        }

        public bool UseLocalTimezone
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (UpdateInterval != null)
            {
                json["updateInterval"] = UpdateInterval;
            }

            if (!UseLocalTimezone)
            {
                json["useLocalTimezone"] = UseLocalTimezone;
            }
        }
    }
}
