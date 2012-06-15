namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    ///  Defines the fluent interface for configuring <see cref="ListView{T}.Selection"/>
    /// </summary>
    public class ListViewSelectionSettingsBuilder : IHideObjectMembers
    {
        private readonly ListViewSelectionSettings settings;

        public ListViewSelectionSettingsBuilder(ListViewSelectionSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables selection.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView(Model)
        ///             .Name("ListView")
        ///             .Selectable(selection => selection.Enabled((bool)ViewData["enableSelection"]))
        /// %&gt;
        /// </code>
        /// </example>        
        public ListViewSelectionSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Specifies whether multiple or single selection is allowed.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView(Model)
        ///             .Name("ListView")
        ///             .Selectable(selection => selection.Mode((bool)ViewData["selectionMode"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Mode method is useful to switch between different selection modes.
        /// </remarks>
        public ListViewSelectionSettingsBuilder Mode(ListViewSelectionMode mode)
        {
            settings.Mode = mode;

            return this;
        }
    }
}
