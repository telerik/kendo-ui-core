namespace Kendo.Mvc.UI.Fluent
{
    using System;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridSortableSettings"/>.
    /// </summary>
    public class PivotConfiguratorSortSettingsBuilder : IHideObjectMembers
    {
        private readonly PivotConfiguratorSortableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridSortSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public PivotConfiguratorSortSettingsBuilder(PivotConfiguratorSortableSettings settings)
        {
            this.settings = settings;
        }
        
        /// <summary>
        /// Enables or disables sorting.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PivotConfigurator()
        ///             .Name("PivotConfigurator")
        ///             .Sortable(sorting => sorting.Enabled((bool)ViewData["enableSorting"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable sorting based on certain conditions.
        /// </remarks>
        public virtual PivotConfiguratorSortSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Enables or disables unsorted mode.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PivotConfigurator()
        ///             .Name("PivotConfigurator")
        ///             .Sortable(sorting => sorting.AllowUnsort(true))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual PivotConfiguratorSortSettingsBuilder AllowUnsort(bool value)
        {
            settings.AllowUnsort = value;

            return this;
        }

        
    }
}