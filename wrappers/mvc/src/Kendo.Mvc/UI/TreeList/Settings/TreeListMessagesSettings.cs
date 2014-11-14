namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListMessagesSettings : JsonObject
    {
        public TreeListMessagesSettings()
        {
            //>> Initialization
        
            Commands = new TreeListMessagesCommandsSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public string NoRows { get; set; }
        
        public string Loading { get; set; }
        
        public string RequestFailed { get; set; }
        
        public string Retry { get; set; }
        
        public TreeListMessagesCommandsSettings Commands
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (NoRows.HasValue())
            {
                json["noRows"] = NoRows;
            }
            
            if (Loading.HasValue())
            {
                json["loading"] = Loading;
            }
            
            if (RequestFailed.HasValue())
            {
                json["requestFailed"] = RequestFailed;
            }
            
            if (Retry.HasValue())
            {
                json["retry"] = Retry;
            }
            
            var commands = Commands.ToJson();
            if (commands.Any())
            {
                json["commands"] = commands;
            }
        //<< Serialization
        }
    }
}
