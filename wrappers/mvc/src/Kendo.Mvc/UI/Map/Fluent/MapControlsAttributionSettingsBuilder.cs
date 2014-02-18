namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapControlsAttributionSettings settings.
    /// </summary>
    public class MapControlsAttributionSettingsBuilder: IHideObjectMembers
    {
        private readonly MapControlsAttributionSettings container;

        public MapControlsAttributionSettingsBuilder(MapControlsAttributionSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        //<< Fields

        /// <summary>
        /// The position of the attribution control. Possible values include:
        /// </summary>
        /// <param name="position">The desired position.</param>
        public MapControlsAttributionSettingsBuilder Position(MapControlPosition position)
        {
            container.Position = position;

            return this;
        }
    }
}

