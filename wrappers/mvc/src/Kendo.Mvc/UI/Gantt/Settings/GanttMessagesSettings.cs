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
                
            Views = new GanttMessagesViewsSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public GanttMessagesViewsSettings Views
        {
            get;
            set;
        }
        
        public GanttMessagesActionsSettings Actions
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var views = Views.ToJson();
            if (views.Any())
            {
                json["views"] = views;
            }
                
            var actions = Actions.ToJson();
            if (actions.Any())
            {
                json["actions"] = actions;
            }
                
        //<< Serialization
        }
    }
}
