namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo Window position settings
    /// </summary>
    public class WindowPositionSettingsBuilder
    {
        private readonly WindowPositionSettings settings;

        public WindowPositionSettingsBuilder(WindowPositionSettings settings)
        {
            this.settings = settings;
        }

        public WindowPositionSettingsBuilder Top(int top) 
        {
            settings.Top = top;

            return this;
        }

        public WindowPositionSettingsBuilder Left(int left)
        {
            settings.Left = left;

            return this;
        }

    }
}
