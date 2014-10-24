namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBox{T}"/> component.
    /// </summary>
    public class CheckBoxBuilder<T> : WidgetBuilderBase<CheckBox<T>, CheckBoxBuilder<T>>
    {
        public CheckBoxBuilder(CheckBox<T> component)
            : base(component)
        { }

        /// <summary>
        /// Sets the initial value of the TextBox.
        /// </summary>
        public CheckBoxBuilder<T> Value(T value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the initial format of the TextBox.
        /// </summary>
        /// <param name="format"></param>
        public CheckBoxBuilder<T> Format(bool format)
        {
            //Component.Format = format;

            return this;
        }

        /// <summary>
        /// Enables or disables the textbox.
        /// </summary>
        /// <param name="isEnabled"></param>
        /// <returns></returns>
        public CheckBoxBuilder<T> Enable(bool isEnabled)
        {
            Component.Enabled = isEnabled;

            return this;
        }
    }
}