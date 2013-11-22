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
        public MapMarkerTooltipBuilder(Tooltip container) :
            base(container)
        {
        }
    }
}

