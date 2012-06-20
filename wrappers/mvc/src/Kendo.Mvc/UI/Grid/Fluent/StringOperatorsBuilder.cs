namespace Kendo.Mvc.UI.Fluent
{
    public class StringOperatorsBuilder : IHideObjectMembers
    {
        private readonly StringOperators strings;

        public StringOperatorsBuilder(StringOperators operators)
        {
            this.strings = operators;
        }

        public StringOperatorsBuilder Clear()
        {
            strings.Operators.Clear();

            return this;
        }

        public StringOperatorsBuilder IsEqualTo(string message)
        {
            strings.Operators["eq"] = message;

            return this;
        }

        public StringOperatorsBuilder IsNotEqualTo(string message)
        {
            strings.Operators["neq"] = message;

            return this;
        }

        public StringOperatorsBuilder StartsWith(string message)
        {
            strings.Operators["startswith"] = message;

            return this;
        }

        public StringOperatorsBuilder EndsWith(string message)
        {
            strings.Operators["endswith"] = message;

            return this;
        }

        public StringOperatorsBuilder Contains(string message)
        {
            strings.Operators["contains"] = message;

            return this;
        }

        public StringOperatorsBuilder DoesNotContain(string message)
        {
            strings.Operators["doesnotcontain"] = message;

            return this;
        }
    }
}