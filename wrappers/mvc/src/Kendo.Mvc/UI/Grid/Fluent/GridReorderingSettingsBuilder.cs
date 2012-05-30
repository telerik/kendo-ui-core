namespace Kendo.Mvc.UI.Fluent
{
    public class GridReorderingSettingsBuilder: IHideObjectMembers
    {
        private readonly GridReorderingSettings settings;

        public GridReorderingSettingsBuilder(GridReorderingSettings settings)
        {
            this.settings = settings;
        }

        public GridReorderingSettingsBuilder Columns(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}