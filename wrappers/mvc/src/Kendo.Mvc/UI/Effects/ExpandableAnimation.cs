namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc;
    using Kendo.Mvc.Extensions;

    public class ExpandableAnimation : JsonObject
    {
        public ExpandableAnimation()
        {
            Enabled = true;
            Expand = new Effects("expand");
            Collapse = new Effects("collapse");
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public Effects Expand 
        { 
            get; 
            set; 
        }

        public Effects Collapse
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (!Enabled)
            {
                json["animation"] = false;
            }
            else
            {
                var options = Expand.ToJson();

                options.Merge(Collapse.ToJson());

                if (options.Keys.Any())
                {
                    json["animation"] = options;
                }
            }
        }
    }
}
