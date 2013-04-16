namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo Window resizing settings
    /// </summary>
    public class WindowResizingSettingsBuilder
    {
        private readonly WindowResizingSettings settings;

        public WindowResizingSettingsBuilder(WindowResizingSettings settings)
        {
            this.settings = settings;
        }

        public WindowResizingSettingsBuilder Enabled(bool enable) 
        {
            settings.Enabled = enable;

            return this;
        }

        public WindowResizingSettingsBuilder MinWidth(int minWidth)
        {
            settings.MinWidth = minWidth;

            return this;
        }

        public WindowResizingSettingsBuilder MaxWidth(int maxWidth)
        {
            settings.MaxWidth = maxWidth;

            return this;
        }

        public WindowResizingSettingsBuilder MinHeight(int minHeight)
        {
            settings.MinHeight = minHeight;

            return this;
        }

        public WindowResizingSettingsBuilder MaxHeight(int maxHeight)
        {
            settings.MaxHeight = maxHeight;

            return this;
        }
    }
}
