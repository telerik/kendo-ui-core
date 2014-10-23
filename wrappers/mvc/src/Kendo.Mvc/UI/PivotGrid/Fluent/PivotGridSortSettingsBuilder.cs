namespace Kendo.Mvc.UI.Fluent
{
    using System;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridSortableSettings"/>.
    /// </summary>
    public class PivotGridSortSettingsBuilder : IHideObjectMembers
    {
        private readonly PivotGridSortableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridSortSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public PivotGridSortSettingsBuilder(PivotGridSortableSettings settings)
        {
            this.settings = settings;
        }
        
        /// <summary>
        /// Enables or disables sorting.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PivotGrid()
        ///             .Name("PivotGrid")
        ///             .Sortable(sorting => sorting.Enabled((bool)ViewData["enableSorting"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable sorting based on certain conditions.
        /// </remarks>
        public virtual PivotGridSortSettingsBuilder Enabled(bool value)
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
        ///  &lt;%= Html.Kendo().PivotGrid()
        ///             .Name("PivotGrid")
        ///             .Sortable(sorting => sorting.AllowUnsort(true))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual PivotGridSortSettingsBuilder AllowUnsort(bool value)
        {
            settings.AllowUnsort = value;

            return this;
        }

        
    }
}