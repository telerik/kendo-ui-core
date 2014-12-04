namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttMessagesSettings : JsonObject
    {
        public GanttMessagesSettings()
        {
            //>> Initialization
        
            Actions = new GanttMessagesActionsSettings();
                
            Editor = new GanttMessagesEditorSettings();
                
            Views = new GanttMessagesViewsSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public GanttMessagesActionsSettings Actions
        {
            get;
            set;
        }
        
        public string Cancel { get; set; }
        
        public string DeleteDependencyWindowTitle { get; set; }
        
        public string DeleteTaskWindowTitle { get; set; }
        
        public string Destroy { get; set; }
        
        public GanttMessagesEditorSettings Editor
        {
            get;
            set;
        }
        
        public string Save { get; set; }
        
        public GanttMessagesViewsSettings Views
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var actions = Actions.ToJson();
            if (actions.Any())
            {
                json["actions"] = actions;
            }
            if (Cancel.HasValue())
            {
                json["cancel"] = Cancel;
            }
            
            if (DeleteDependencyWindowTitle.HasValue())
            {
                json["deleteDependencyWindowTitle"] = DeleteDependencyWindowTitle;
            }
            
            if (DeleteTaskWindowTitle.HasValue())
            {
                json["deleteTaskWindowTitle"] = DeleteTaskWindowTitle;
            }
            
            if (Destroy.HasValue())
            {
                json["destroy"] = Destroy;
            }
            
            var editor = Editor.ToJson();
            if (editor.Any())
            {
                json["editor"] = editor;
            }
            if (Save.HasValue())
            {
                json["save"] = Save;
            }
            
            var views = Views.ToJson();
            if (views.Any())
            {
                json["views"] = views;
            }
        //<< Serialization
        }
    }
}
