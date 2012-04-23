// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="NumericTextBox"/> component.
    /// </summary>
    public class NumericTextBoxBuilder<T> : TextBoxBuilderBase<T, NumericTextBox<T>, NumericTextBoxBuilder<T>> where T : struct
    {
        /// Initializes a new instance of the <see cref="NumericTextBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public NumericTextBoxBuilder(NumericTextBox<T> component)
            : base(component)
        { }

        /// <summary>
        /// Defines the number of the decimal digits.
        /// </summary>
        public NumericTextBoxBuilder<T> DecimalDigits(int digits)
        {
            Guard.IsNotNull(digits, "digits");

            ((NumericTextBox<T>)Component).DecimalDigits = digits;

            return this;
        }

        /// <summary>
        /// Sets the decimal separator.
        /// </summary>
        public NumericTextBoxBuilder<T> DecimalSeparator(string separator)
        {
            Guard.IsNotNullOrEmpty(separator, "separator");

            ((NumericTextBox<T>)Component).DecimalSeparator = separator;

            return this;
        }
    }
}