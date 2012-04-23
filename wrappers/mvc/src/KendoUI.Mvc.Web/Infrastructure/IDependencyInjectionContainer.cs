// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;

    public interface IDependencyInjectionContainer
    {
        void Register<TService, TArg>(Func<TArg, TService> factory);

        void Register<TService, TArg1, TArg2, TArg3, TArg4>(Func<TArg1, TArg2, TArg3, TArg4, TService> factory);

        void Register<TService, TArg1, TArg2, TArg3>(Func<TArg1, TArg2, TArg3, TService> factory);

        void Register<TService, TArg1, TArg2>(Func<TArg1, TArg2, TService> factory);

        void Register<TService>(Func<TService> factory);
        
        void Register<TService>(Func<IDependencyInjectionContainer, TService> factory);

        TService Resolve<TService>();
    }
}
