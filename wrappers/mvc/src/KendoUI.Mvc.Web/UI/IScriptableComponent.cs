

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;

    /// <summary>
    /// Defines the basic building block of scriptable component.
    /// </summary>
    public interface IScriptableComponent
    {
        /// <summary>
        /// Gets or sets the asset key.
        /// </summary>
        /// <value>The asset key.</value>
        string AssetKey
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the script files path. Path must be a virtual path.
        /// </summary>
        /// <value>The script files path.</value>
        string ScriptFilesPath
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the script file names.
        /// </summary>
        /// <value>The script file names.</value>
        IList<string> ScriptFileNames
        {
            get;
        }

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