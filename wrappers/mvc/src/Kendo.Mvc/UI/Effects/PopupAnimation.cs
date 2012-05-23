namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Extensions;

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

        //obsolete
        public void SerializeTo(IClientSideObjectWriter writer)
        {
            if (Enabled == false)
            {
                writer.Append("animation", Enabled);
            }
            else
            {
                var result = string.Join(",", new string[] { Open.Serialize(), Close.Serialize() }.Where(item => item.HasValue()));

                if (result.HasValue())
                {
                    writer.Append("animation: {{{0}}}".FormatWith(result));
                }
            }
        }
    }
}
