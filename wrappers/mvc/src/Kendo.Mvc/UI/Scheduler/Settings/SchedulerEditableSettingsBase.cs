namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public abstract class SchedulerEditableSettingsBase : JsonObject, ISchedulerEditableSettings
    {
        public SchedulerEditableSettingsBase()
        {
            this.Create = true;
            this.Destroy = true;
            this.Update = true;
            this.Enable = true;
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

        public bool Enable
        {
            get;
            set;
        }

        protected void SerializeBaseOptions(IDictionary<string, object> json)
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
