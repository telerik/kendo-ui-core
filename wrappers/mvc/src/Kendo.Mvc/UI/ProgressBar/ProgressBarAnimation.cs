namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public class ProgressBarAnimation : JsonObject
    {
        public ProgressBarAnimation()
        {
            Enable = true;
        }

        public bool Enable
        {
            get;
            set;
        }

        public int? Duration
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!Enable)
            {
                json["animation"] = false;
            }
            else
            {
                if (Duration.HasValue)
                {
                    var options = new Dictionary<string, object>();

                    options["duration"] = Duration.Value;

                    json["animation"] = options;
                }
            }
        }
    }
}
