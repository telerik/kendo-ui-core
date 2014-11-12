namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableResizeHandlesHoverSettings : JsonObject
    {
        public DiagramEditableResizeHandlesHoverSettings()
        {
            //>> Initialization
        
            Fill = new DiagramEditableResizeHandlesHoverFillSettings();
                
            Stroke = new DiagramEditableResizeHandlesHoverStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramEditableResizeHandlesHoverFillSettings Fill
        {
            get;
            set;
        }
        
        public DiagramEditableResizeHandlesHoverStrokeSettings Stroke
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
