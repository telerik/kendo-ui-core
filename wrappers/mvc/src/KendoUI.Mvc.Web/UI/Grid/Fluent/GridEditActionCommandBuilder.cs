

namespace KendoUI.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for configuring the edit action command.
    /// </summary>
    /// <typeparam name=""></typeparam>
    public class GridEditActionCommandBuilder : GridActionCommandBuilderBase<GridEditActionCommand, GridEditActionCommandBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridEditActionCommandBuilder&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="command">The command.</param>
        public GridEditActionCommandBuilder(GridEditActionCommand command)
            : base(command)
        {
        }

        /// <summary>
        /// Sets the text displayed by the "update" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridEditActionCommandBuilder UpdateText(string text)
        {
            Command.UpdateText = text;

            return this;
        }

        /// <summary>
        /// Sets the text displayed by the "cancel" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridEditActionCommandBuilder CancelText(string text)
        {
            Command.CancelText = text;

            return this;
        }

        /// <summary>
        /// Sets the text displayed by the "insert" button. If not set a default value is used.
        /// </summary>
        /// <param name="text">The text which should be displayed</param>
        /// <returns></returns>
        public GridEditActionCommandBuilder InsertText(string text)
        {
            Command.InsertText = text;

            return this;
        }
    }
}
