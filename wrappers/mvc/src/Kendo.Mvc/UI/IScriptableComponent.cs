namespace Kendo.Mvc.UI
{
    using System.IO;

    /// <summary>
    /// Defines the basic building block of scriptable component.
    /// </summary>
    public interface IScriptableComponent
    {
        bool IsSelfInitialized
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