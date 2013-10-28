namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapControlsZoomSettings settings.
    /// </summary>
    public class MapControlsZoomSettingsBuilder: IHideObjectMembers
    {
        private readonly MapControlsZoomSettings container;

        public MapControlsZoomSettingsBuilder(MapControlsZoomSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The position of the zoom control. Possible values include:
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public MapControlsZoomSettingsBuilder Position(string value)
        {
            container.Position = value;

            return this;
        }
        
        //<< Fields

        
    }
}

