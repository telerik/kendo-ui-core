// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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
            Guard.IsNotNull(digits, "digits");

            ((CurrencyTextBox)Component).DecimalDigits = digits;

            return this;
        }

        /// <summary>
        /// Sets the decimal separator.
        /// </summary>
        public CurrencyTextBoxBuilder DecimalSeparator(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            ((CurrencyTextBox)Component).DecimalSeparator = value;

            return this;
        }

        /// <summary>
        /// Sets the index of the positive pattern.
        /// </summary>
        public CurrencyTextBoxBuilder PositivePatternIndex(int value)
        {
            Guard.IsNotNull(value, "value");

            ((CurrencyTextBox)Component).PositivePatternIndex = value;

            return this;
        }

        /// <summary>
        /// Sets the currency symbol.
        /// </summary>
        public CurrencyTextBoxBuilder CurrencySymbol(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            ((CurrencyTextBox)Component).CurrencySymbol = value;

            return this;
        }
    }
}