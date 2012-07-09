namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the Filter menu <see cref="StringOperators"/> DropDownList options.
    /// </summary>
    public class StringOperatorsBuilder : IHideObjectMembers
    {
        private readonly StringOperators strings;

        public StringOperatorsBuilder(StringOperators operators)
        {
            this.strings = operators;
        }

        /// <summary>
        /// Clears the options.
        /// </summary>
        /// <remarks>Supported only in conjunction with custom messages.</remarks>
        public StringOperatorsBuilder Clear()
        {
            strings.Operators.Clear();

            return this;
        }

        /// <summary>
        /// Sets the text for IsEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>  
        public StringOperatorsBuilder IsEqualTo(string message)
        {
            strings.Operators["eq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for IsNotEqualTo operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>  
        public StringOperatorsBuilder IsNotEqualTo(string message)
        {
            strings.Operators["neq"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for StartsWith operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public StringOperatorsBuilder StartsWith(string message)
        {
            strings.Operators["startswith"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for EndsWith operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public StringOperatorsBuilder EndsWith(string message)
        {
            strings.Operators["endswith"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for Contains operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public StringOperatorsBuilder Contains(string message)
        {
            strings.Operators["contains"] = message;

            return this;
        }

        /// <summary>
        /// Sets the text for DoesNotContain operator filter menu item.
        /// </summary>
        /// <param name="message">The message</param>
        public StringOperatorsBuilder DoesNotContain(string message)
        {
            strings.Operators["doesnotcontain"] = message;

            return this;
        }
    }
}