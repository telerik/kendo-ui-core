namespace Kendo.Mvc.UI.Fluent
{
    public class GridResizingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridResizingSettings settings;

        public GridResizingSettingsBuilder(GridResizingSettings settings)
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
