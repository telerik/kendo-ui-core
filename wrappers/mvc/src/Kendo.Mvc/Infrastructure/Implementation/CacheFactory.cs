namespace Kendo.Mvc.Infrastructure.Implementation
{
    internal class CacheFactory : ICacheFactory
    {
        private readonly bool debug;
        private readonly ICacheProvider provider;

        public CacheFactory(bool debug, ICacheProvider provider)
        {
            this.debug = debug;
            this.provider = provider;
        }

        public ICache Create(string prefix)
        {
            if (debug)
            {
                return new NoCache();
            }

            return new Cache(prefix, provider);
        }
    }
}
