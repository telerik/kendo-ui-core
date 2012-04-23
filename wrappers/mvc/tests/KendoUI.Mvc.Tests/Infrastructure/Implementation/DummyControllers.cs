// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Web.Mvc;

    [Authorize(Users = "Mort, Elvis, Einstein", Roles = "Admin")]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            throw new NotImplementedException();
        }
    }

    public class ProductController : Controller
    {
        public ActionResult List()
        {
            throw new NotImplementedException();
        }

        [Authorize(Users = "Mort, Elvis, Einstein")]
        public ActionResult Detail(int id)
        {
            throw new NotImplementedException();
        }
    }

    public class DuplicateNameController : Controller
    {
        public ActionResult AMethod()
        {
            throw new NotImplementedException();
        }
    }
}

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests.DummyNamespace
{
    using System;
    using System.Web.Mvc;

    [Authorize(Roles = "User, Power User, Admin")]
    public class DuplicateNameController : Controller
    {
        public ActionResult AMethod()
        {
            throw new NotImplementedException();
        }
    }
}

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Areas.Test1
{
    using System;
    using System.Web.Mvc;

    public class AreaController : Controller
    {
        [Authorize(Users = "Mort, Elvis, Einstein")]
        public ActionResult AMethod()
        {
            throw new NotImplementedException();
        }
    }

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            throw new NotImplementedException();
        }
    }
}

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Areas.Test2
{
    using System;
    using System.Web.Mvc;

    public class AreaController : Controller
    {
        public ActionResult AMethod()
        {
            throw new NotImplementedException();
        }
    }
}