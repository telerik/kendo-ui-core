namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class PaletteSizeBuilder : IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PaletteSizeBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PaletteSizeBuilder(ColorPaletteTileSize tileSize)
        {
            this.tileSize = tileSize;
        }

        private ColorPaletteTileSize tileSize;

        /// <summary>
        /// Set the width of the tiles
        /// </summary>
        /// <param name="width">The tile width.</param>
        public PaletteSizeBuilder Width(int width)
        {
            tileSize.Width = width;

            return this;
        }

        /// <summary>
        /// Set the height of the tiles
        /// </summary>
        /// <param name="width">The tile height.</param>
        public PaletteSizeBuilder Height(int height)
        {
            tileSize.Height = height;

            return this;
        }
    }
}
