namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapControlsSettings settings.
    /// </summary>
    public class MapControlsSettingsBuilder: IHideObjectMembers
    {
        private readonly MapControlsSettings container;

        public MapControlsSettingsBuilder(MapControlsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Enables or disables the built-in attribution control.
        /// </summary>
        /// <param name="value">The value that configures the attribution.</param>
        public MapControlsSettingsBuilder Attribution(bool value)
        {
            container.Attribution = value;

            return this;
        }
        
        /// <summary>
        /// Enables or disables the built-in navigator control (directional pad).
        /// </summary>
        /// <param name="configurator">The action that configures the navigator.</param>
        public MapControlsSettingsBuilder Navigator(Action<MapControlsNavigatorSettingsBuilder> configurator)
        {
            configurator(new MapControlsNavigatorSettingsBuilder(container.Navigator));
            return this;
        }
        
        //<< Fields

        
    }
}

