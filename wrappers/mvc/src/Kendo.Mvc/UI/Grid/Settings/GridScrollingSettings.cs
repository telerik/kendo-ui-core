namespace Kendo.Mvc.UI
{    
    public class GridScrollingSettings : JsonObject
    {        
        public GridScrollingSettings()
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