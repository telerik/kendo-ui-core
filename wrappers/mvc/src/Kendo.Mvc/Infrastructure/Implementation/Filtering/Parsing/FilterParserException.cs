namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Runtime.Serialization;

    [Serializable]
    public class FilterParserException : Exception
    {
        public FilterParserException()
        {
        }

        public FilterParserException(string message)
            : base(message)
        {
        }

        public FilterParserException(string message, Exception inner)
            : base(message, inner)
        {
        }

        protected FilterParserException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
