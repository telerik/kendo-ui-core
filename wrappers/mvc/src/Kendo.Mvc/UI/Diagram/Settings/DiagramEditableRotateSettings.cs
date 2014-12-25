namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableRotateSettings : JsonObject
    {
        public DiagramEditableRotateSettings()
        {
            Enabled = true;
        
            //>> Initialization
        
            Fill = new DiagramEditableRotateFillSettings();
                
            Stroke = new DiagramEditableRotateStrokeSettings();
                
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public DiagramEditableRotateFillSettings Fill
        {
            get;
            set;
        }
        
        public DiagramEditableRotateStrokeSettings Stroke
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
