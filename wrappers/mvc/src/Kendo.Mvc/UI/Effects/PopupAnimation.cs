namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System.Collections.Generic;
    using System.Linq;

    public class PopupAnimation : JsonObject
    {
        public PopupAnimation()
        {
            Enabled = true;
            Open = new Effects("open");
            Close = new Effects("close");
        }

        public bool Enabled
        { 
            get; 
            set; 
        }

        public Effects Open
        { 
            get; 
            set; 
        }

        public Effects Close
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (!Enabled)
            {
                json["animation"] = false;
            }
            else
            {
                var options = Open.ToJson();
                
                options.Merge(Close.ToJson());

                if (options.Keys.Any())
                {
                    json["animation"] = options;
                }
            }
        }
    }
}
