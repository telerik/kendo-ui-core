namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Kendo.Mvc.Resources;

    public class SchedulerEditableSettings : SchedulerEditableSettingsBase
    {
        public SchedulerEditableSettings()
            :base()
        {
            DisplayDeleteConfirmation = true;

            Confirmation = Messages.Scheduler_Confirmation;
        }

        public string Template { get; set; }

        public string TemplateId { get; set; }

        public string Confirmation { get; set; }

        public bool DisplayDeleteConfirmation { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            SerializeBaseOptions(json);

            if (!string.IsNullOrEmpty(Template))
            {
                json["template"] = Template;
            }

            if (!string.IsNullOrEmpty(TemplateId))
            {
                var idPrefix = "#";

                json["template"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, TemplateId) };    
            }

            if (!DisplayDeleteConfirmation)
            {
                json["confirmation"] = false;
            }
            else if (!string.IsNullOrEmpty(Confirmation))
            {
                json["confirmation"] = Confirmation;
            }

        }
    }
}
