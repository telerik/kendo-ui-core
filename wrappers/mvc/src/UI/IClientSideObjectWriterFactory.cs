namespace KendoUI.Mvc.UI
{
    using System.IO;

    /// <summary>
    /// Defines the factory to create <see cref="IClientSideObjectWriter"/>.
    /// </summary>
    public interface IClientSideObjectWriterFactory
    {
        /// <summary>
        /// Creates a writer.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="type">The type.</param>
        /// <param name="textWriter">The text writer.</param>
        /// <returns></returns>
        IClientSideObjectWriter Create(string id, string type, TextWriter textWriter);
    }
}