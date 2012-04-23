// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Xml;
    
    internal class ResXResource : ResourceBase
    {
        private static readonly XmlReaderSettings readerSettings = new XmlReaderSettings
        {
            IgnoreComments = true,
            IgnoreWhitespace = true,
            IgnoreProcessingInstructions = true,
            CloseInput = true
        };

        private readonly string resourceLocation;

        public ResXResource(string resourceLocation)
        {
            this.resourceLocation = resourceLocation;
        }

        protected override void Load()
        {
            using (XmlReader reader = XmlReader.Create(resourceLocation, readerSettings))
            {
                while (reader.Read())
                {
                    if (reader.LocalName.Equals("data", StringComparison.OrdinalIgnoreCase) && reader.HasAttributes)
                    {
                        string name = reader.GetAttribute("name");

                        if (!string.IsNullOrEmpty(name) && reader.ReadToDescendant("value"))
                        {
                            CurrentResources.Add(name, reader.ReadElementContentAsString());
                        }
                    }
                }
            }
        }
    }

}
