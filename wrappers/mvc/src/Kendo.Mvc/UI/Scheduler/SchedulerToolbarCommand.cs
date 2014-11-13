namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public class SchedulerToolbarCommand : JsonObject
    {
        public SchedulerToolbarCommand(SchedulerToolbarCommandType type)
	    {
            Type = type;
        }

        public SchedulerToolbarCommandType Type
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            string commandType = Type.ToString();
            json["name"] = commandType.ToLower();
        }
    }
}
