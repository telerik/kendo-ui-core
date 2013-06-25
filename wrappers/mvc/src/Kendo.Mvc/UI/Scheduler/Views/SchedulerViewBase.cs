namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public abstract class SchedulerViewBase : JsonObject, ISchedulerView
    {
        protected SchedulerViewBase(SchedulerViewType type)
	    {
            Type = type;
	    }
        
        public string Title
        { 
            get; 
            set; 
        }

        public SchedulerViewType Type
        {
            get;
            set;
        }

        public SchedulerViewEditableSettings Editable
        {
            get;
            set;
        }

        public string EventTemplate
        {
            get;
            set;
        }

        public string EventTemplateId
        {
            get;
            set;
        }

        public string SelectedDateFormat
        {
            get;
            set;
        }

        public bool Selected
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var idPrefix = "#";

            if (!string.IsNullOrEmpty(Title))
            {
                json["title"] = Title;
            }
            json["type"] = Type;

            if (Editable != null)
            {
                if (Editable.Enable == false)
                {
                    json["editable"] = false;
                }
                else if (Editable.ToJson().Count > 0)
                {
                    json["editable"] = Editable.ToJson();
                }
            }

            if (!string.IsNullOrEmpty(EventTemplate))
            {
                json["eventTemplate"] = EventTemplate;
            }

            if (!string.IsNullOrEmpty(EventTemplateId))
            {
                json["eventTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, EventTemplateId) };
            }

            if (!string.IsNullOrEmpty(SelectedDateFormat))
            {
                json["selectedDateFormat"] = SelectedDateFormat;
            }

            if (Selected != false)
            {
                json["selected"] = Selected;
            }
        }
    }
}
