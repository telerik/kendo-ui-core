// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Configuration
{
    using System.Configuration;

    /// <summary>
    /// Web asset item configuration element.
    /// </summary>
    public class WebAssetConfigurationElement : ConfigurationElement
    {
        /// <summary>
        /// Gets or sets the source.
        /// </summary>
        /// <value>The source.</value>
        [ConfigurationProperty("source", IsRequired = true, IsKey = true)]
        public string Source
        {
            get
            {
                return (string)this["source"];
            }

            set
            {
                this["source"] = value;
            }
        }
    }
}