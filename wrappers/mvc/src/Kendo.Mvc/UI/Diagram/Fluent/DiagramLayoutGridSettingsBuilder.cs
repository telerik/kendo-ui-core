namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramLayoutGridSettings settings.
    /// </summary>
    public class DiagramLayoutGridSettingsBuilder: IHideObjectMembers
    {
        private readonly DiagramLayoutGridSettings container;

        public DiagramLayoutGridSettingsBuilder(DiagramLayoutGridSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// defines the width of the grid. The bigger this parameter the more components will be organized in an horizontal row. How many components really depends on your diagram and they type of layout applied to each component. The default is set to 800.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramLayoutGridSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// defines the left offset of the grid layout. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the offsetx.</param>
        public DiagramLayoutGridSettingsBuilder OffsetX(double value)
        {
            container.OffsetX = value;

            return this;
        }
        
        /// <summary>
        /// defines the top offset of the grid layout. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the offsety.</param>
        public DiagramLayoutGridSettingsBuilder OffsetY(double value)
        {
            container.OffsetY = value;

            return this;
        }
        
        /// <summary>
        /// defines the horizontal spacing between each component. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the componentspacingx.</param>
        public DiagramLayoutGridSettingsBuilder ComponentSpacingX(double value)
        {
            container.ComponentSpacingX = value;

            return this;
        }
        
        /// <summary>
        /// defines the vertical spacing between each component. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the componentspacingy.</param>
        public DiagramLayoutGridSettingsBuilder ComponentSpacingY(double value)
        {
            container.ComponentSpacingY = value;

            return this;
        }
        
        //<< Fields
    }
}

