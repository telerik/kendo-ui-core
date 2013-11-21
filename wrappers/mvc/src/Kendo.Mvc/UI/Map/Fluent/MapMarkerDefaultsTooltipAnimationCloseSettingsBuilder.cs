namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkerDefaultsTooltipAnimationCloseSettings settings.
    /// </summary>
    public class MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkerDefaultsTooltipAnimationCloseSettings container;

        public MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder(MapMarkerDefaultsTooltipAnimationCloseSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used for closing of the tooltip.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the animation duration.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

