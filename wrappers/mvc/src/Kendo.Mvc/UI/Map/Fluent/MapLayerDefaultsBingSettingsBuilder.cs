namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsBingSettings settings.
    /// </summary>
    public class MapLayerDefaultsBingSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsBingSettings container;

        public MapLayerDefaultsBingSettingsBuilder(MapLayerDefaultsBingSettings settings)
        {
            container = settings;
        }

        //>> Fields

        /// <summary>
        /// The attribution of all bing layers.
        /// </summary>
        /// <param name="value">The value that configures the attribution.</param>
        public MapLayerDefaultsBingSettingsBuilder Attribution(string value)
        {
            container.Attribution = value;

            return this;
        }

        /// <summary>
        /// The the opacity of all bing layers.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsBingSettingsBuilder Opacity(string value)
        {
            container.Opacity = value;

            return this;
        }


        /// <summary>
        /// The key of all bing layers.
        /// </summary>
        /// <param name="value">The value that configures the key.</param>
        public MapLayerDefaultsBingSettingsBuilder Key(string value)
        {
            container.Key = value;

            return this;
        }

        //<< Fields
    }
}
