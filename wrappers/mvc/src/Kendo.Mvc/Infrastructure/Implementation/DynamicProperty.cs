namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    
    public class DynamicProperty
    {
        string name;
        Type type;

        /// <exclude/>
        /// <excludeToc/>
        public DynamicProperty(string name, Type type)
        {
            if (name == null) throw new ArgumentNullException("name");
            if (type == null) throw new ArgumentNullException("type");
            this.name = name;
            this.type = type;
        }

        /// <exclude/>
        /// <excludeToc/>
        public string Name
        {
            get { return name; }
        }

        /// <exclude/>
        /// <excludeToc/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1721:PropertyNamesShouldNotMatchGetMethods")]
        public Type Type
        {
            get { return type; }
        }
    }
}
