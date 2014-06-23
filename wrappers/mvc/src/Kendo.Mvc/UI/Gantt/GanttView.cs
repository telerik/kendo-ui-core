namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttView : JsonObject
    {
        public GanttView()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool? Selected { get; set; }
        
        public double? SlotSize { get; set; }
        
        public string TimeHeaderTemplate { get; set; }

        public string TimeHeaderTemplateId { get; set; }
        
        public string DayHeaderTemplate { get; set; }

        public string DayHeaderTemplateId { get; set; }
        
        public string WeekHeaderTemplate { get; set; }

        public string WeekHeaderTemplateId { get; set; }
        
        public string MonthHeaderTemplate { get; set; }

        public string MonthHeaderTemplateId { get; set; }
        
        public GanttViewType? Type { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Selected.HasValue)
            {
                json["selected"] = Selected;
            }
                
            if (SlotSize.HasValue)
            {
                json["slotSize"] = SlotSize;
            }
                
            if (!string.IsNullOrEmpty(TimeHeaderTemplateId))
            {
                json["timeHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        TimeHeaderTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(TimeHeaderTemplate))
            {
                json["timeHeaderTemplate"] = TimeHeaderTemplate;
            }
                
            if (!string.IsNullOrEmpty(DayHeaderTemplateId))
            {
                json["dayHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        DayHeaderTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(DayHeaderTemplate))
            {
                json["dayHeaderTemplate"] = DayHeaderTemplate;
            }
                
            if (!string.IsNullOrEmpty(WeekHeaderTemplateId))
            {
                json["weekHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        WeekHeaderTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(WeekHeaderTemplate))
            {
                json["weekHeaderTemplate"] = WeekHeaderTemplate;
            }
                
            if (!string.IsNullOrEmpty(MonthHeaderTemplateId))
            {
                json["monthHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        MonthHeaderTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(MonthHeaderTemplate))
            {
                json["monthHeaderTemplate"] = MonthHeaderTemplate;
            }
                
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
        //<< Serialization
        }
    }
}
