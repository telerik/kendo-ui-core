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

        ///<summary>
        /// Sets the top position.
        ///</summary>
        public WindowPositionSettingsBuilder Top(int top)
        {
            settings.Top = top;

            return this;
        }

        ///<summary>
        /// Sets the left position.
        ///</summary>
        public WindowPositionSettingsBuilder Left(int left)
        {
            settings.Left = left;

            return this;
        }

    }
}
