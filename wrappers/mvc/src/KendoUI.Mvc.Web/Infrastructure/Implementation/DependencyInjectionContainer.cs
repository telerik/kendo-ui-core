// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;

    internal class DependencyInjectionContainer : IDependencyInjectionContainer
    {
        private readonly IDictionary<Type, object> factories;

        public DependencyInjectionContainer()
        {
            factories = new Dictionary<Type, object>();
        }

        public TService Resolve<TService>()
        {
            object factory;

            if (factories.TryGetValue(typeof(TService), out factory))
            {
                return ((Func<TService>)factory)();
            }

            return default(TService);
        }

        public void Register<TService>(Func<TService> factory)
        {
            factories[typeof(TService)] = factory;
        }

        public void Register<TService>(Func<IDependencyInjectionContainer, TService> factory)
        {
            Func<TService> partialFactory = () => factory(this);
            
            factories[typeof(TService)] = partialFactory;
        }
        
        public void Register<TService, TArg>(Func<TArg, TService> factory)
        {
            Func<TService> partialFactory = () => factory(Resolve<TArg>());
            
            factories[typeof(TService)] = partialFactory;
        }        
        
        public void Register<TService, TArg1, TArg2>(Func<TArg1, TArg2, TService> factory)
        {
            Func<TService> partialFactory = () => factory(Resolve<TArg1>(), Resolve<TArg2>());
            
            factories[typeof(TService)] = partialFactory;
        }        
        
        public void Register<TService, TArg1, TArg2, TArg3>(Func<TArg1, TArg2, TArg3, TService> factory)
        {
            Func<TService> partialFactory = () => factory(Resolve<TArg1>(), Resolve<TArg2>(), Resolve<TArg3>());
            
            factories[typeof(TService)] = partialFactory;
        }        
        
        public void Register<TService, TArg1, TArg2, TArg3, TArg4>(Func<TArg1, TArg2, TArg3, TArg4, TService> factory)
        {
            Func<TService> partialFactory = () => factory(Resolve<TArg1>(), Resolve<TArg2>(), Resolve<TArg3>(), Resolve<TArg4>());
            
            factories[typeof(TService)] = partialFactory;
        }
    }
}
