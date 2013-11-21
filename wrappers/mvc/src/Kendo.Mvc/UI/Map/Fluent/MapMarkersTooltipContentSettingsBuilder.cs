namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkersTooltipContentSettings settings.
    /// </summary>
    public class MapMarkersTooltipContentSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkersTooltipContentSettings container;

        public MapMarkersTooltipContentSettingsBuilder(MapMarkersTooltipContentSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies a URL or request options that the tooltip should load its content from.
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public MapMarkersTooltipContentSettingsBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        //<< Fields
    }
}

