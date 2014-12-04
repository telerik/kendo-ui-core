namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttMessagesEditorSettings : JsonObject
    {
        public GanttMessagesEditorSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string AssignButton { get; set; }
        
        public string EditorTitle { get; set; }
        
        public string End { get; set; }
        
        public string PercentComplete { get; set; }
        
        public string Resources { get; set; }
        
        public string ResourcesEditorTitle { get; set; }
        
        public string ResourcesHeader { get; set; }
        
        public string Start { get; set; }
        
        public string Title { get; set; }
        
        public string UnitsHeader { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (AssignButton.HasValue())
            {
                json["assignButton"] = AssignButton;
            }
            
            if (EditorTitle.HasValue())
            {
                json["editorTitle"] = EditorTitle;
            }
            
            if (End.HasValue())
            {
                json["end"] = End;
            }
            
            if (PercentComplete.HasValue())
            {
                json["percentComplete"] = PercentComplete;
            }
            
            if (Resources.HasValue())
            {
                json["resources"] = Resources;
            }
            
            if (ResourcesEditorTitle.HasValue())
            {
                json["resourcesEditorTitle"] = ResourcesEditorTitle;
            }
            
            if (ResourcesHeader.HasValue())
            {
                json["resourcesHeader"] = ResourcesHeader;
            }
            
            if (Start.HasValue())
            {
                json["start"] = Start;
            }
            
            if (Title.HasValue())
            {
                json["title"] = Title;
            }
            
            if (UnitsHeader.HasValue())
            {
                json["unitsHeader"] = UnitsHeader;
            }
            
        //<< Serialization
        }
    }
}
