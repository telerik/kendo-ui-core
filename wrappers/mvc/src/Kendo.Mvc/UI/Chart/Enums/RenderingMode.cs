namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the rendering modes supported by DataViz widgets
    /// </summary>
    public enum RenderingMode
    {
        /// <summary>
        /// Renders the widget as VML, if available.
        /// </summary>
        SVG,

        /// <summary>
        /// Renders the widget as a Canvas element, if available.
        /// </summary>
        VML,

        /// <summary>
        /// Renders the widget as inline SVG document, if available.
        /// Note: Animations and most interactive features will be disabled.
        /// </summary>
        Canvas
    }
}