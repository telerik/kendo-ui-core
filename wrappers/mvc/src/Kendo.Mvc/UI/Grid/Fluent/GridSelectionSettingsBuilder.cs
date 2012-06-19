namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    ///  Defines the fluent interface for configuring <see cref="Grid{T}.Selectable"/>
    /// </summary>
    public class GridSelectionSettingsBuilder : IHideObjectMembers
    {
        private readonly GridSelectableSettings settings;

        public GridSelectionSettingsBuilder(GridSelectableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables selection.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Selectable(selection => selection.Enabled((bool)ViewData["enableSelection"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable scrolling based on certain conditions.
        /// </remarks>
        public GridSelectionSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Specifies whether multiple or single selection is allowed.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Selectable(selection => selection.Mode((bool)ViewData["selectionMode"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Mode method is useful to switch between different selection modes.
        /// </remarks>
        public GridSelectionSettingsBuilder Mode(GridSelectionMode mode)
        {
            settings.Mode = mode;

            return this;
        }

        /// <summary>
        /// Specifies whether row or cell selection is allowed.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Selectable(selection => selection.Type((bool)ViewData["selectionType"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Type method is useful to switch between different selection types.
        /// </remarks>
        public GridSelectionSettingsBuilder Type(GridSelectionType type)
        {
            settings.Type = type;

            return this;
        }
    }
}
