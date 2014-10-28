namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="RadioButton"/> component.
    /// </summary>
    public class RadioButtonBuilder : WidgetBuilderBase<RadioButton, RadioButtonBuilder>
    {
        public RadioButtonBuilder(RadioButton component)
            : base(component)
        { }

        /// <summary>
        /// Checkes or unchecks the radio button.
        /// </summary>
        /// <param name="isChecked"></param>
        /// <returns></returns>
        public RadioButtonBuilder Checked(bool isChecked)
        {
            Component.Checked = isChecked;

            return this;
        }

        /// <summary>
        /// Enables or disables the radio button.
        /// </summary>
        /// <param name="isEnabled"></param>
        /// <returns></returns>
        public RadioButtonBuilder Enable(bool isEnabled)
        {
            Component.Enabled = isEnabled;

            return this;
        }

        public RadioButtonBuilder Label(string text)
        {
            Component.Label = text;

            return this;
        }
    }
}