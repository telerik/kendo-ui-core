namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the map marker tooltip settings.
    /// </summary>
    public class MapMarkerTooltipBuilder: TooltipSettingsBuilder<MapMarkerTooltipBuilder>
    {
        public MapMarkerTooltipBuilder(MapMarkerTooltip tooltip) :
            base(tooltip)
        {
            Tooltip = tooltip;
        }

        private MapMarkerTooltip Tooltip
        {
            get;
            set;
        }

        public MapMarkerTooltipBuilder Template(string value)
        {
            Tooltip.Template = value;
            return this;
        }
    }
}

