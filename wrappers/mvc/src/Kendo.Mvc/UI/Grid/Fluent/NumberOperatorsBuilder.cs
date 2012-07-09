namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the Filter menu <see cref="NumberOperators"/> DropDownList options.
    /// </summary>
    public class NumberOperatorsBuilder : IHideObjectMembers
    {
        private readonly NumberOperators numbers;

        public NumberOperatorsBuilder(NumberOperators operators)
        {
            this.numbers = operators;
        }

        /// <summary>
        /// Clears the options.
        /// </summary>
        /// <remarks>Supported only in conjunction with custom messages.</remarks>
        public NumberOperatorsBuilder Clear()
        {
            numbers.Operators.Clear();

            return this;
        }

        /// <summary>
        /// Sets the text for IsEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>  
        public NumberOperatorsBuilder IsEqualTo(string message)
        {
            numbers.Operators["eq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsNotEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>   
        public NumberOperatorsBuilder IsNotEqualTo(string message)
        {
            numbers.Operators["neq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsGreaterThanOrEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>     
        public NumberOperatorsBuilder IsGreaterThanOrEqualTo(string message)
        {
            numbers.Operators["gte"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsGreaterThan operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param> 
        public NumberOperatorsBuilder IsGreaterThan(string message)
        {
            numbers.Operators["gt"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsLessThanOrEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public NumberOperatorsBuilder IsLessThanOrEqualTo(string message)
        {
            numbers.Operators["lte"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsLessThan operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public NumberOperatorsBuilder IsLessThan(string message)
        {
            numbers.Operators["lt"] = message;

            return this;
        }
    }
}