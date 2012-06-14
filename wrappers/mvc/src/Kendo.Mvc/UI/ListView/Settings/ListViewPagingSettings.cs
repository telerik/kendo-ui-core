namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class ListViewPagingSettings : JsonObject
    {                
        public bool Enabled
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //
        }
    }
}