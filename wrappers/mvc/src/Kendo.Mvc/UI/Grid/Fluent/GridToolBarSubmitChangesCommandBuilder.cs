namespace Kendo.Mvc.UI.Fluent
{
    public class GridToolBarSaveCommandBuilder<T> : GridToolBarCommandBuilderBase<T, GridToolBarSaveCommand<T>, GridToolBarSaveCommandBuilder<T>> where T : class
    {
        public GridToolBarSaveCommandBuilder(GridToolBarSaveCommand<T> command)
            : base(command)
        {
        }

        /// <summary>
        /// Sets the text displayed by the "save changes" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridToolBarSaveCommandBuilder<T> SaveText(string text)
        {
            Command.SaveText = text;

            return this;
        }

        /// <summary>
        /// Sets the text displayed by the "cancel changes" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridToolBarSaveCommandBuilder<T> CancelText(string text)
        {
            Command.CancelText = text;

            return this;
        }
    }
}