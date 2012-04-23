// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
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
