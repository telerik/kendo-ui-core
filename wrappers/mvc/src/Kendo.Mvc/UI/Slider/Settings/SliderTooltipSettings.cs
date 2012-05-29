namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class SliderTooltipSettings : ISliderTooltipSettings
    {
        public SliderTooltipSettings()
        {
            Enabled = true;
            Format = "{0}";
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        public string Template
        {
            get;
            set;
        }

        public void SerializeTo(string key, IDictionary<string, object> options)
        {
            if (Format != "{0}" || !Enabled || Template.HasValue())
            {
                var settings = new Dictionary<string, object>();

                settings["enabled"] = Enabled;
                settings["format"] = Format;
                settings["template"] = Template;

                options.Add(key, settings);
            }
        }
    }
}