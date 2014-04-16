namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableSettings : JsonObject
    {
        public DiagramEditableSettings()
        {
            //>> Initialization
        
            Resize = new DiagramEditableResizeSettings();
                
            Rotate = new DiagramEditableRotateSettings();
                
            Select = new DiagramEditableSelectSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramEditableResizeSettings Resize
        {
            get;
            set;
        }
        
        public DiagramEditableRotateSettings Rotate
        {
            get;
            set;
        }
        
        public DiagramEditableSelectSettings Select
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
        //<< Serialization

            if (Resize != null)
            {
                var resize = Resize.ToJson();
                if (resize.Any())
                {
                    json["resize"] = resize;
                }
            }
            else
            {
                json["resize"] = false;
            }

            if (Select != null)
            {
                var select = Select.ToJson();
                if (select.Any())
                {
                    json["select"] = select;
                }
            }
            else
            {
                json["select"] = false;
            }

            if (Rotate != null)
            {
                var rotate = Rotate.ToJson();
                if (rotate.Any())
                {
                    json["rotate"] = rotate;
                }
            }
            else
            {
                json["rotate"] = false;
            }
        }
    }
}
