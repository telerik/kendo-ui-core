namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapControlsNavigatorSettings settings.
    /// </summary>
    public class MapControlsNavigatorSettingsBuilder: IHideObjectMembers
    {
        private readonly MapControlsNavigatorSettings container;

        public MapControlsNavigatorSettingsBuilder(MapControlsNavigatorSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The position of the navigator control. Possible values include:
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public MapControlsNavigatorSettingsBuilder Position(MapControlPosition value)
        {
            container.Position = value;

            return this;
        }
        
        //<< Fields

        
    }
}

