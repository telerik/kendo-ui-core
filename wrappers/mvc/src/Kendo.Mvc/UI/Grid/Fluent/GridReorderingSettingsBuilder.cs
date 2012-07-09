namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Reorderable"/>
    /// </summary>
    public class GridReorderingSettingsBuilder: IHideObjectMembers
    {
        private readonly GridReorderableSettings settings;

        public GridReorderingSettingsBuilder(GridReorderableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables column reordering.
        /// </summary>
        /// <param name="value">True to enable column reordering, otherwise false</param>        
        public GridReorderingSettingsBuilder Columns(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}