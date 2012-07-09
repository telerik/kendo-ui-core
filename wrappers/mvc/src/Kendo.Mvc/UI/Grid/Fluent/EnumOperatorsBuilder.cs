namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the Filter menu <see cref="EnumOperators"/> DropDownList options.
    /// </summary>    
    public class EnumOperatorsBuilder : IHideObjectMembers
    {
        private readonly EnumOperators enums;

        public EnumOperatorsBuilder(EnumOperators operators)
        {
            this.enums = operators;
        }

        /// <summary>
        /// Clears the options. Supported only in conjunction with custom messages.
        /// </summary>
        public EnumOperatorsBuilder Clear()
        {
            enums.Operators.Clear();

            return this;
        }

        /// <summary>
        /// Sets the text for IsEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>   
        public EnumOperatorsBuilder IsEqualTo(string message)
        {
            enums.Operators["eq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsNotEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public EnumOperatorsBuilder IsNotEqualTo(string message)
        {
            enums.Operators["neq"] = message;

            return this;
        }       
    }
}