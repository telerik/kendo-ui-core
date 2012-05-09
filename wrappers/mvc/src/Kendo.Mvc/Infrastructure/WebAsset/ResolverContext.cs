namespace Kendo.Mvc.Infrastructure
{
    public class ResolverContext
    {
        public bool SupportsCompression
        {
            get;
            set;
        }

        public bool IsSecureConnection
        {
            get;
            set;
        }

        public string HttpHandlerPath
        {
            get;
            set;
        }

        public string ContentType
        {
            get;
            set;
        }
    }
}
