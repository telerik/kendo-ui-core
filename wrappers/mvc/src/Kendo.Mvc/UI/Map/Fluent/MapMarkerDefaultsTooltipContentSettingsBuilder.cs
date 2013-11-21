namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkerDefaultsTooltipContentSettings settings.
    /// </summary>
    public class MapMarkerDefaultsTooltipContentSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkerDefaultsTooltipContentSettings container;

        public MapMarkerDefaultsTooltipContentSettingsBuilder(MapMarkerDefaultsTooltipContentSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies a URL or request options that the tooltip should load its content from.
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public MapMarkerDefaultsTooltipContentSettingsBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        //<< Fields
    }
}

