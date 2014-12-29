namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Scrollable"/>
    /// </summary>
    public class GridScrollSettingsBuilder : IHideObjectMembers
    {
        private readonly GridScrollableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridScrollSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridScrollSettingsBuilder(GridScrollableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables scrolling.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Scrollable(s => s.Enabled((bool)ViewData["enableScrolling"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable scrolling based on certain conditions.
        /// </remarks>
        public virtual GridScrollSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Sets the height of the scrollable area in pixels.
        /// </summary>
        /// <param name="pixelHeight">The height in pixels.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Scrollable(s => s.Height(400))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridScrollSettingsBuilder Height(int pixelHeight)
        {

            settings.Height = pixelHeight + "px";

            return this;
        }

        /// <summary>
        /// Sets the height of the scrollable.
        /// </summary>
        /// <param name="value">The height in pixels.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Scrollable(s => s.Height("20em")) // use "auto" to remove the default height and make the Grid expand automatically
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridScrollSettingsBuilder Height(string value)
        {
            settings.Height = value;

            return this;
        }

        /// <summary>
        /// Enables or disabled virtual scrolling.
        /// </summary>
        /// <param name="value">boolean flag</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Scrollable(s => s.Virtual(true))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridScrollSettingsBuilder Virtual(bool value)
        {
            settings.Virtual = value;

            return this;
        } 
    }
}