namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the Filter menu <see cref="DateOperators"/> DropDownList options.
    /// </summary>
    public class DateOperatorsBuilder : IHideObjectMembers
    {
        private readonly DateOperators numbers;

        public DateOperatorsBuilder(DateOperators operators)
        {
            this.numbers = operators;
        }

        /// <summary>
        /// Clears the options.
        /// </summary>        
        /// <remarks>Supported only in conjunction with custom messages.</remarks>
        public DateOperatorsBuilder Clear()
        {
            numbers.Operators.Clear();

            return this;
        }

        /// <summary>
        /// Sets the text for IsEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>        
        public DateOperatorsBuilder IsEqualTo(string message)
        {
            numbers.Operators["eq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsNotEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>        
        public DateOperatorsBuilder IsNotEqualTo(string message)
        {
            numbers.Operators["neq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsGreaterThanOrEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>        
        public DateOperatorsBuilder IsGreaterThanOrEqualTo(string message)
        {
            numbers.Operators["gte"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsGreaterThan operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param> 
        public DateOperatorsBuilder IsGreaterThan(string message)
        {
            numbers.Operators["gt"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsLessThanOrEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param> 
        public DateOperatorsBuilder IsLessThanOrEqualTo(string message)
        {
            numbers.Operators["lte"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsLessThan operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param> 
        public DateOperatorsBuilder IsLessThan(string message)
        {
            numbers.Operators["lt"] = message;

            return this;
        }
    }
}