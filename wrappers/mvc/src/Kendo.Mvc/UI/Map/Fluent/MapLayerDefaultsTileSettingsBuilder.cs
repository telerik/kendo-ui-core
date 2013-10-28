namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsTileSettings settings.
    /// </summary>
    public class MapLayerDefaultsTileSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsTileSettings container;

        public MapLayerDefaultsTileSettingsBuilder(MapLayerDefaultsTileSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The URL template for tile layers. Template variables:
        /// </summary>
        /// <param name="value">The value that configures the urltemplateid.</param>
        public MapLayerDefaultsTileSettingsBuilder UrlTemplateId(string value)
        {
            container.UrlTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The copyright message for all tile layers.
        /// </summary>
        /// <param name="value">The value that configures the copyright.</param>
        public MapLayerDefaultsTileSettingsBuilder Copyright(string value)
        {
            container.Copyright = value;

            return this;
        }
        
        //<< Fields

        
    }
}

