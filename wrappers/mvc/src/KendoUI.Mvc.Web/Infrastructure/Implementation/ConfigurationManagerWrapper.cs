namespace KendoUI.Mvc.Infrastructure.Implementation
{
    using System.Configuration;

    /// <summary>
    /// Encapsulates the ConfigurationManager object that contains methods for accessing System.Web.HttpRuntime.Cache object.
    /// </summary>
    public class ConfigurationManagerWrapper : IConfigurationManager
    {
        /// <summary>
        /// Gets the section with the specified name.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sectionName">Name of the section.</param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1004:GenericMethodsShouldProvideTypeParameter", Justification = "Generic seems the only solution. otherwise, it will be overloaded with different asp.net sections.")]
        public T GetSection<T>(string sectionName) where T : ConfigurationSection
        {
            return ConfigurationManager.GetSection(sectionName) as T;
        }
    }
}