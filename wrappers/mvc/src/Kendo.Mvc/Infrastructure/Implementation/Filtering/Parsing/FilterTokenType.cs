namespace Kendo.Mvc.Infrastructure.Implementation
{
    public enum FilterTokenType
    {
        Property,
        ComparisonOperator,
        Or,
        And,
        Not,
        Function,
        Number,
        String,
        Boolean,
        DateTime,
        LeftParenthesis,
        RightParenthesis,
        Comma
    }
}
