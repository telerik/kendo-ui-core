namespace Kendo.Mvc.UI
{
    using System.IO;

    /// <summary>
    /// Defines the basic building block of scriptable component.
    /// </summary>
    public interface IScriptableComponent
    {
        /// <summary>
        /// Gets the client side object writer factory.
        /// </summary>
        /// <value>The client side object writer factory.</value>
        IClientSideObjectWriterFactory ClientSideObjectWriterFactory
        {
            get;
        }

        bool IsSelfInitialized
        {
            get;
        }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer.</param>
        void WriteInitializationScript(TextWriter writer);

        /// <summary>
        /// Writes the cleanup script.
        /// </summary>
        /// <param name="writer">The writer.</param>
        void WriteCleanupScript(TextWriter writer);
    }
}