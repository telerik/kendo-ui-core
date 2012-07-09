namespace Kendo.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Navigatable"/>
    /// </summary>
    public class GridNavigatableSettingsBuilder : IHideObjectMembers
    {
        private readonly GridNavigatableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridNavigatableSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridNavigatableSettingsBuilder(GridNavigatableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables keyboard navigation.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Navigatable(setting => setting.Enabled((bool)ViewData["enableKeyBoardNavigation"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable keyboard navigation based on certain conditions.
        /// </remarks>
        public virtual GridNavigatableSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

    }
}
