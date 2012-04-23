// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
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
