namespace KendoUI.Mvc.UI
{

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PercentTextBox"/> component.
    /// </summary>
    public class PercentTextBoxBuilder : TextBoxBuilderBase<double, PercentTextBox, PercentTextBoxBuilder>
    {
        /// Initializes a new instance of the <see cref="PercentTextBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PercentTextBoxBuilder(PercentTextBox component)
            : base(component)
        { }

        /// <summary>
        /// Defines the number of the decimal digits.
        /// </summary>
        public PercentTextBoxBuilder DecimalDigits(int digits)
        {

            ((PercentTextBox)Component).DecimalDigits = digits;

            return this;
        }

        /// <summary>
        /// Sets the decimal separator.
        /// </summary>
        public PercentTextBoxBuilder DecimalSeparator(string separator)
        {

            ((PercentTextBox)Component).DecimalSeparator = separator;

            return this;
        }

        /// <summary>
        /// Sets the index of the positive pattern.
        /// </summary>
        public PercentTextBoxBuilder PositivePatternIndex(int positivePatternIndex)
        {

            ((PercentTextBox)Component).PositivePatternIndex = positivePatternIndex;

            return this;
        }

        /// <summary>
        /// Sets the percent symbol.
        /// </summary>
        public PercentTextBoxBuilder PercentSymbol(string percentSymbol)
        {

            ((PercentTextBox)Component).PercentSymbol = percentSymbol;

            return this;
        }
    }
}