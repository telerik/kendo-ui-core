namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBox{T}"/> component.
    /// </summary>
    public class TextBoxBuilder<T> : WidgetBuilderBase<TextBox<T>, TextBoxBuilder<T>>
    {
        public TextBoxBuilder(TextBox<T> component)
            : base(component)
        { }

        /// <summary>
        /// Sets the initial value of the TextBox.
        /// </summary>
        public TextBoxBuilder<T> Value(T value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the initial format of the TextBox.
        /// </summary>
        /// <param name="format"></param>
        public TextBoxBuilder<T> Format(string format)
        {
            Component.Format = format;

            return this;
        }

        /// <summary>
        /// Enables or disables the textbox.
        /// </summary>
        /// <param name="isEnabled"></param>
        /// <returns></returns>
        public TextBoxBuilder<T> Enable(bool isEnabled)
        {
            Component.Enabled = isEnabled;

            return this;
        }
    }
}