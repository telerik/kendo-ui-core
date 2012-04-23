

namespace KendoUI.Mvc.UI
{


    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="IntegerTextBox"/> component.
    /// </summary>
    public class IntegerTextBoxBuilder : TextBoxBuilderBase<int, IntegerTextBox, IntegerTextBoxBuilder>
    {
        /// Initializes a new instance of the <see cref="IntegerTextBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public IntegerTextBoxBuilder(IntegerTextBox component)
            : base(component)
        { }
    }
}