namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewEditableSettings : JsonObject
    {
        public SchedulerViewEditableSettings()
        {
            this.Create = true;
            this.Destroy = true;
            this.Update = true;
        }

        public bool Create 
        { 
            get;
            set;
        }

        public bool Destroy
        {
            get;
            set;
        }

        public bool Update
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Create != true)
            {
                json["create"] = Create;
            }

            if (Destroy != true)
            {
                json["destroy"] = Destroy;
            }

            if (Update != true)
            {
                json["update"] = Update;
            }
        }
    }
}
