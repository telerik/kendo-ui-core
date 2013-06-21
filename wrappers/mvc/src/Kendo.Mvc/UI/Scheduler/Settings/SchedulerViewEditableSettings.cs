namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SchedulerViewEditableSettings : SchedulerEditableSettingsBase
    {
        public SchedulerViewEditableSettings()
            :base()
        { }

        protected override void Serialize(IDictionary<string, object> json)
        {
            SerializeBaseOptions(json);
        }
    }
}
