namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramLayoutGridSettings settings.
    /// </summary>
    public class DiagramLayoutGridSettingsBuilder<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly DiagramLayoutGridSettings container;

        public DiagramLayoutGridSettingsBuilder(DiagramLayoutGridSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the horizontal spacing between each component. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the componentspacingx.</param>
        public DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel> ComponentSpacingX(double value)
        {
            container.ComponentSpacingX = value;

            return this;
        }
        
        /// <summary>
        /// Defines the vertical spacing between each component. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the componentspacingy.</param>
        public DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel> ComponentSpacingY(double value)
        {
            container.ComponentSpacingY = value;

            return this;
        }
        
        /// <summary>
        /// Defines the left offset of the grid layout. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the offsetx.</param>
        public DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel> OffsetX(double value)
        {
            container.OffsetX = value;

            return this;
        }
        
        /// <summary>
        /// Defines the top offset of the grid layout. The default is 50.
        /// </summary>
        /// <param name="value">The value that configures the offsety.</param>
        public DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel> OffsetY(double value)
        {
            container.OffsetY = value;

            return this;
        }
        
        /// <summary>
        /// Defines the width of the grid. The bigger this parameter the more components will be organized in an horizontal row. How many components really depends on your diagram and they type of layout applied to each component. The default is set to 800.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DiagramLayoutGridSettingsBuilder<TShapeModel,TConnectionModel> Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

