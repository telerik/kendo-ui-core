// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.IO;

    public class WebAsset : IWebAsset
    {
        public WebAsset(string source)
        {
            Source = source;
        }

        public bool UseTelerikContentDeliveryNetwork
        {
            get;
            set;
        }

        public string FileName
        {
            get
            {
                return Path.GetFileName(Source);
            }
        }

        public string Version
        {
            get;
            set;
        }

        public string Source
        {
            get;
            private set;
        }

        public string Extension
        {
            get
            {
                return Path.GetExtension(Source);
            }
        }
    }
}