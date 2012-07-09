namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Resizable"/>
    /// </summary>
    public class GridResizingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridResizableSettings settings;

        public GridResizingSettingsBuilder(GridResizableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables column resizing.
        /// </summary>
        /// <param name="value">True to enable column resizing, otherwise false</param>   
        public GridResizingSettingsBuilder Columns(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}
