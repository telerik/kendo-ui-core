namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Sortable's cursor offset position settings
    /// </summary>
    public class SortableCursorOffsetSettingsBuilder
    {
        private readonly SortableCursorOffset settings;

        public SortableCursorOffsetSettingsBuilder(SortableCursorOffset settings)
        {
            this.settings = settings;
        }

        ///<summary>
        /// Sets the top position.
        ///</summary>
        public SortableCursorOffsetSettingsBuilder Top(int top)
        {
            settings.Top = top;

            return this;
        }

        ///<summary>
        /// Sets the left position.
        ///</summary>
        public SortableCursorOffsetSettingsBuilder Left(int left)
        {
            settings.Left = left;

            return this;
        }

    }
}