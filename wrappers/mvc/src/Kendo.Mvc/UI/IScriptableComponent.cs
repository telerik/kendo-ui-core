namespace Kendo.Mvc.UI
{
    using System.IO;

    public interface IScriptableComponent
    {
        bool IsSelfInitialized
        {
            get;
        }

        bool IsInClientTemplate
        {
            get;        
        }

         string Selector
         {
             get;
         }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer.</param>
        void WriteInitializationScript(TextWriter writer);
    }
}