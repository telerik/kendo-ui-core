namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="checkbox"/> component.
    /// </summary>
    public class CheckBoxBuilder : WidgetBuilderBase<CheckBox, CheckBoxBuilder>
    {
        public CheckBoxBuilder(CheckBox component)
            : base(component)
        { }

        /// <summary>
        /// Checkes or unchecks the checkbox.
        /// </summary>
        /// <param name="isChecked"></param>
        /// <returns></returns>
        public CheckBoxBuilder Checked(bool isChecked)
        {
            Component.Checked = isChecked;

            return this;
        }

        /// <summary>
        /// Enables or disables the checkbox.
        /// </summary>
        /// <param name="isEnabled"></param>
        /// <returns></returns>
        public CheckBoxBuilder Enable(bool isEnabled)
        {
            Component.Enabled = isEnabled;

            return this;
        }

        public CheckBoxBuilder Label(string text)
        {
            Component.Label = text;

            return this;
        }
    }
}