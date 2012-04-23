

namespace KendoUI.Mvc.Configuration
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