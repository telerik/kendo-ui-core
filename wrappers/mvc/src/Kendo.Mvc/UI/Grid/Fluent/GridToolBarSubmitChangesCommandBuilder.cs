namespace Kendo.Mvc.UI.Fluent
{
    public class GridToolBarSubmitChangesCommandBuilder<T> : GridToolBarCommandBuilderBase<T, GridToolBarSubmitChangesCommand<T>, GridToolBarSubmitChangesCommandBuilder<T>> where T : class
    {
        public GridToolBarSubmitChangesCommandBuilder(GridToolBarSubmitChangesCommand<T> command)
            : base(command)
        {
        }

        /// <summary>
        /// Sets the text displayed by the "save changes" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridToolBarSubmitChangesCommandBuilder<T> SaveText(string text)
        {
            Command.SaveText = text;

            return this;
        }

        /// <summary>
        /// Sets the text displayed by the "cancel changes" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridToolBarSubmitChangesCommandBuilder<T> CancelText(string text)
        {
            Command.CancelText = text;

            return this;
        }
    }
}