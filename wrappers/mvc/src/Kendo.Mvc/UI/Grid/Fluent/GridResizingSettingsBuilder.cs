namespace Kendo.Mvc.UI.Fluent
{
    public class GridResizingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridResizableSettings settings;

        public GridResizingSettingsBuilder(GridResizableSettings settings)
        {
            this.settings = settings;
        }

        public GridResizingSettingsBuilder Columns(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}
