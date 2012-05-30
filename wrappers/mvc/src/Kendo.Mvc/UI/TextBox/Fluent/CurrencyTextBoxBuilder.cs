namespace KendoUI.Mvc.UI
{

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="CurrencyTextBox"/> component.
    /// </summary>
    public class CurrencyTextBoxBuilder : TextBoxBuilderBase<decimal, CurrencyTextBox, CurrencyTextBoxBuilder>
    {
        /// Initializes a new instance of the <see cref="CurrencyTextBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public CurrencyTextBoxBuilder(CurrencyTextBox component)
            : base(component)
        { }

        /// <summary>
        /// Defines the number of the decimal digits.
        /// </summary>
        public CurrencyTextBoxBuilder DecimalDigits(int digits)
        {

            ((CurrencyTextBox)Component).DecimalDigits = digits;

            return this;
        }

        /// <summary>
        /// Sets the decimal separator.
        /// </summary>
        public CurrencyTextBoxBuilder DecimalSeparator(string value)
        {

            ((CurrencyTextBox)Component).DecimalSeparator = value;

            return this;
        }

        /// <summary>
        /// Sets the index of the positive pattern.
        /// </summary>
        public CurrencyTextBoxBuilder PositivePatternIndex(int value)
        {

            ((CurrencyTextBox)Component).PositivePatternIndex = value;

            return this;
        }

        /// <summary>
        /// Sets the currency symbol.
        /// </summary>
        public CurrencyTextBoxBuilder CurrencySymbol(string value)
        {

            ((CurrencyTextBox)Component).CurrencySymbol = value;

            return this;
        }
    }
}