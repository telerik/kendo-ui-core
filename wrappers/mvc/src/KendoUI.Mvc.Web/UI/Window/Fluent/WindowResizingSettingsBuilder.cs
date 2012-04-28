namespace KendoUI.Mvc.UI.Fluent
{
    using Infrastructure;

    public class WindowResizingSettingsBuilder
    {
        private readonly WindowResizingSettings settings;

        public WindowResizingSettingsBuilder(WindowResizingSettings settings)
        {
            Guard.IsNotNull(settings, "settings");
            this.settings = settings;
        }

        public WindowResizingSettingsBuilder Enabled(bool enable) 
        {
            Guard.IsNotNull(enable, "enable");

            settings.Enabled = enable;

            return this;
        }

        public WindowResizingSettingsBuilder MinWidth(int minWidth)
        {
            Guard.IsNotNull(minWidth, "minWidth");

            settings.MinWidth = minWidth;

            return this;
        }

        public WindowResizingSettingsBuilder MaxWidth(int maxWidth)
        {
            Guard.IsNotNull(maxWidth, "maxWidth");

            settings.MaxWidth = maxWidth;

            return this;
        }

        public WindowResizingSettingsBuilder MinHeight(int minHeight)
        {
            Guard.IsNotNull(minHeight, "minHeight");

            settings.MinHeight = minHeight;

            return this;
        }

        public WindowResizingSettingsBuilder MaxHeight(int maxHeight)
        {
            Guard.IsNotNull(maxHeight, "maxHeight");

            settings.MaxHeight = maxHeight;

            return this;
        }
    }
}
