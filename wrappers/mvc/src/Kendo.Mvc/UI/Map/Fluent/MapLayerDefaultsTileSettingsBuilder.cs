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
        /// The attribution of all tile layers.
        /// </summary>
        /// <param name="value">The value that configures the attribution.</param>
        public MapLayerDefaultsTileSettingsBuilder Attribution(string value)
        {
            container.Attribution = value;

            return this;
        }
        
        /// <summary>
        /// The the opacity of all tile layers.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsTileSettingsBuilder Opacity(string value)
        {
            container.Opacity = value;

            return this;
        }
        
        //<< Fields

        
    }
}

