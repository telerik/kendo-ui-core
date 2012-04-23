// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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
            Guard.IsNotNull(digits, "digits");

            ((PercentTextBox)Component).DecimalDigits = digits;

            return this;
        }

        /// <summary>
        /// Sets the decimal separator.
        /// </summary>
        public PercentTextBoxBuilder DecimalSeparator(string separator)
        {
            Guard.IsNotNullOrEmpty(separator, "separator");

            ((PercentTextBox)Component).DecimalSeparator = separator;

            return this;
        }

        /// <summary>
        /// Sets the index of the positive pattern.
        /// </summary>
        public PercentTextBoxBuilder PositivePatternIndex(int positivePatternIndex)
        {
            Guard.IsNotNull(positivePatternIndex, "positivePatternIndex");

            ((PercentTextBox)Component).PositivePatternIndex = positivePatternIndex;

            return this;
        }

        /// <summary>
        /// Sets the percent symbol.
        /// </summary>
        public PercentTextBoxBuilder PercentSymbol(string percentSymbol)
        {
            Guard.IsNotNullOrEmpty(percentSymbol, "percentSymbol");

            ((PercentTextBox)Component).PercentSymbol = percentSymbol;

            return this;
        }
    }
}