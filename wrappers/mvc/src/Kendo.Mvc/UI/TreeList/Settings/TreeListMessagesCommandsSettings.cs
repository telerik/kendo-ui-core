namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListMessagesCommandsSettings : JsonObject
    {
        public TreeListMessagesCommandsSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Edit { get; set; }
        
        public string Update { get; set; }
        
        public string Canceledit { get; set; }
        
        public string Create { get; set; }
        
        public string Createchild { get; set; }
        
        public string Destroy { get; set; }
        
        public string Excel { get; set; }
        
        public string Pdf { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Edit.HasValue())
            {
                json["edit"] = Edit;
            }
            
            if (Update.HasValue())
            {
                json["update"] = Update;
            }
            
            if (Canceledit.HasValue())
            {
                json["canceledit"] = Canceledit;
            }
            
            if (Create.HasValue())
            {
                json["create"] = Create;
            }
            
            if (Createchild.HasValue())
            {
                json["createchild"] = Createchild;
            }
            
            if (Destroy.HasValue())
            {
                json["destroy"] = Destroy;
            }
            
            if (Excel.HasValue())
            {
                json["excel"] = Excel;
            }
            
            if (Pdf.HasValue())
            {
                json["pdf"] = Pdf;
            }
            
        //<< Serialization
        }
    }
}
