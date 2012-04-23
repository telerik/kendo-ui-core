

namespace KendoUI.Mvc.Configuration
{
    using System.Configuration;

    /// <summary>
    /// Web asset group configuration collection 
    /// </summary>
    [ConfigurationCollection(typeof(WebAssetGroupConfigurationElement))]
    public class WebAssetGroupConfigurationElementCollection : ConfigurationElementCollection
    {
        /// <summary>
        /// Gets the <see cref="KendoUI.Mvc.Configuration.WebAssetGroupConfigurationElement"/> with the specified name.
        /// </summary>
        /// <value></value>
        public new WebAssetGroupConfigurationElement this[string name]
        {
            get
            {
                return BaseGet(name) as WebAssetGroupConfigurationElement;
            }
        }

        /// <summary>
        /// Adds the specified element.
        /// </summary>
        /// <param name="element">The element.</param>
        public void Add(WebAssetGroupConfigurationElement element)
        {
            BaseAdd(element);
        }

        /// <summary>
        /// When overridden in a derived class, creates a new <see cref="T:System.Configuration.ConfigurationElement"/>.
        /// </summary>
        /// <returns>
        /// A new <see cref="T:System.Configuration.ConfigurationElement"/>.
        /// </returns>
        protected override ConfigurationElement CreateNewElement()
        {
            return new WebAssetGroupConfigurationElement();
        }

        /// <summary>
        /// Gets the element key for a specified configuration element when overridden in a derived class.
        /// </summary>
        /// <param name="element">The <see cref="T:System.Configuration.ConfigurationElement"/> to return the key for.</param>
        /// <returns>
        /// An <see cref="T:System.Object"/> that acts as the key for the specified <see cref="T:System.Configuration.ConfigurationElement"/>.
        /// </returns>
        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((WebAssetGroupConfigurationElement) element).Name;
        }
    }
}