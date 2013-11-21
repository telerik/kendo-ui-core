namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkersTooltipAnimationCloseSettings settings.
    /// </summary>
    public class MapMarkersTooltipAnimationCloseSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkersTooltipAnimationCloseSettings container;

        public MapMarkersTooltipAnimationCloseSettingsBuilder(MapMarkersTooltipAnimationCloseSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used for closing of the tooltip.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public MapMarkersTooltipAnimationCloseSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the animation duration.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public MapMarkersTooltipAnimationCloseSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

