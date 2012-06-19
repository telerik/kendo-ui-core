namespace Kendo.Mvc.UI.Fluent
{
    public class GridReorderingSettingsBuilder: IHideObjectMembers
    {
        private readonly GridReorderableSettings settings;

        public GridReorderingSettingsBuilder(GridReorderableSettings settings)
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