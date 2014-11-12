namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramConnectionDefaultsSelectionHandlesSettings : JsonObject
    {
        public DiagramConnectionDefaultsSelectionHandlesSettings()
        {
            //>> Initialization
        
            Fill = new DiagramConnectionDefaultsSelectionHandlesFillSettings();
                
            Stroke = new DiagramConnectionDefaultsSelectionHandlesStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramConnectionDefaultsSelectionHandlesFillSettings Fill
        {
            get;
            set;
        }
        
        public DiagramConnectionDefaultsSelectionHandlesStrokeSettings Stroke
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var fill = Fill.ToJson();
            if (fill.Any())
            {
                json["fill"] = fill;
            }
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
        //<< Serialization
        }
    }
}
