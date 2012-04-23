// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    using System.Globalization;

    public class AggregateResult
    {
        private object aggregateValue;
        private int itemCount;
        private readonly AggregateFunction function;

        /// <summary>
        /// Initializes a new instance of the <see cref="AggregateResult"/> class.
        /// </summary>
        /// <param name="value">The value of the result.</param>
        /// <param name="count">The number of arguments used for the calculation of the result.</param>
        /// <param name="function">Function that generated the result.</param>
        /// <exception cref="ArgumentNullException"><c>function</c> is null.</exception>
        public AggregateResult(object value, int count, AggregateFunction function)
        {
            if (function == null)
            {
                throw new ArgumentNullException("function");
            }

            aggregateValue = value;
            itemCount = count;
            this.function = function;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AggregateResult"/> class.
        /// </summary>
        /// <param name="function"><see cref="AggregateFunction"/> that generated the result.</param>
        /// <exception cref="ArgumentNullException"><c>function</c> is null.</exception>
        public AggregateResult(AggregateFunction function)
            : this(null, function)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AggregateResult"/> class.
        /// </summary>
        /// <param name="value">The value of the result.</param>
        /// <param name="function"><see cref="AggregateFunction"/> that generated the result.</param>
        public AggregateResult(object value, AggregateFunction function)
            : this(value, default(int), function)
        {
        }


        /// <summary>
        /// Gets or sets the value of the result.
        /// </summary>
        /// <value>The value of the result.</value>
        public object Value
        {
            get
            {
                return this.aggregateValue;
            }
            internal set
            {

                this.aggregateValue = value;
            }
        }

        public string Member
        {
            get
            {
                return function.SourceField;
            }
        }

        /// <summary>
        /// Gets the formatted value of the result.
        /// </summary>
        /// <value>The formatted value of the result.</value>
        public object FormattedValue
        {
            get
            {
                if (string.IsNullOrEmpty(this.function.ResultFormatString))
                    return this.aggregateValue;
                else
                    return string.Format(CultureInfo.CurrentCulture,
                        this.function.ResultFormatString, this.aggregateValue);
            }
        }

        /// <summary>
        /// Gets or sets the number of arguments used for the calulation of the result.
        /// </summary>
        /// <value>The number of arguments used for the calulation of the result.</value>
        public int ItemCount
        {
            get
            {
                return this.itemCount;
            }
            set
            {
                this.itemCount = value;
            }
        }

        /// <summary>
        /// Gets or sets the text which serves as a caption for the result in a user interface..
        /// </summary>
        /// <value>The text which serves as a caption for the result in a user interface.</value>
        public string Caption
        {
            get
            {
                return this.function.Caption;
            }
        }

        /// <summary>
        /// Gets the name of the function.
        /// </summary>
        /// <value>The name of the function.</value>
        public string FunctionName
        {
            get
            {
                return this.function.FunctionName;
            }
        }

        public string AggregateMethodName
        {
            get
            {
                return function.AggregateMethodName;
            }
        }

        /// <summary>
        /// Returns a <see cref="T:System.String"/> that represents the current <see cref="T:System.Object"/>.
        /// </summary>
        /// <returns>
        /// A <see cref="T:System.String"/> that represents the current <see cref="T:System.Object"/>.
        /// </returns>
        public override string ToString()
        {
            if (this.Value != null)
            {
                return this.Value.ToString();
            }
            return base.ToString();
        }

        public string Format(string format)
        {
            if (Value != null)
            {
                return string.Format(format, Value);
            }

            return ToString();
        }
    }
}
