

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

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

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Format != "{0}" || !Enabled)
            {
                var settings = new Dictionary<string, object>();

                settings["enabled"] = Enabled;
                settings["format"] = Format;

                writer.AppendObject(key, settings);
            }
        }
    }
}