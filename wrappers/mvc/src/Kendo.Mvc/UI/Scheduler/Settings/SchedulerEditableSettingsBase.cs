namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public abstract class SchedulerEditableSettingsBase : JsonObject
    {
        protected SchedulerEditableSettingsBase()
        {
            Create = Destroy = Update = Enabled = true;
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

        public bool Enabled
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (!Create)
            {
                json["create"] = Create;
            }

            if (!Destroy)
            {
                json["destroy"] = Destroy;
            }

            if (!Update)
            {
                json["update"] = Update;
            }
        }
    }
}
