// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.IO;

    /// <summary>
    /// Defines the factory to create <see cref="IClientSideObjectWriter"/>.
    /// </summary>
    public class ClientSideObjectWriterFactory : IClientSideObjectWriterFactory
    {
        /// <summary>
        /// Creates a writer.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="type">The type.</param>
        /// <param name="textWriter">The text writer.</param>
        /// <returns></returns>
        public IClientSideObjectWriter Create(string id, string type, TextWriter textWriter)
        {
            return new ClientSideObjectWriter(id, type, textWriter);
        }
    }
}