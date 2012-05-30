namespace Kendo.Mvc.UI
{
    /// <summary>Specifies the location of tick marks in a component.</summary>
    public enum SliderTickPlacement
    {
        /// <summary>No tick marks appear in the component.</summary>
        None = 0,

        /// <summary>
        /// Tick marks are located on the top of a horizontal component or on the
        /// left of a vertical component.
        /// </summary>
        TopLeft = 1,

        /// <summary>
        /// Tick marks are located on the bottom of a horizontal component or on the
        /// right side of a vertical component.
        /// </summary>
        BottomRight = 2,

        /// <summary>Tick marks are located on both sides of the component.</summary>
        Both = 3
    }
}