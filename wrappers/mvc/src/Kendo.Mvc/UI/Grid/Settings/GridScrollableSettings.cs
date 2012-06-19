namespace Kendo.Mvc.UI
{    
    public class GridScrollableSettings : JsonObject
    {        
        public GridScrollableSettings()
        {            
            Height = "200px";
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Height
        {
            get;
            set;
        }

        public bool Virtual
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (Virtual)
            {
                json["virtual"] = Virtual;
            }
        }
    }
}