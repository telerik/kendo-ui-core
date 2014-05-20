using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bullet_ChartsController : Controller
    {
        public ActionResult Local_Data()
        {
            var model = new BulletChartLocalDataViewModel();

            model.mmHg.Add(new BulletChartItem() { Current = 750, Target = 762.5, Category = "1" });
            model.mmHg.Add(new BulletChartItem() { Current = 754, Target = 768.5, Category = "2" });
            model.mmHg.Add(new BulletChartItem() { Current = 762, Target = 770, Category = "3" });
            model.mmHg.Add(new BulletChartItem() { Current = 764, Target = 773, Category = "4" });
            model.mmHg.Add(new BulletChartItem() { Current = 753, Target = 760, Category = "5" });
            model.mmHg.Add(new BulletChartItem() { Current = 748, Target = 765, Category = "6" });
            model.mmHg.Add(new BulletChartItem() { Current = 740, Target = 760, Category = "7" });
            model.mmHg.Add(new BulletChartItem() { Current = 755, Target = 758, Category = "8" });
            model.mmHg.Add(new BulletChartItem() { Current = 765, Target = 768, Category = "9" });
            model.mmHg.Add(new BulletChartItem() { Current = 776, Target = 783, Category = "10" });
            model.mmHg.Add(new BulletChartItem() { Current = 768, Target = 770, Category = "11" });
            model.mmHg.Add(new BulletChartItem() { Current = 760, Target = 762.5, Category = "12" });
            model.mmHg.Add(new BulletChartItem() { Current = 763, Target = 768, Category = "13" });
            model.mmHg.Add(new BulletChartItem() { Current = 758, Target = 766, Category = "14" });

            model.hPa.Add(new BulletChartItem() { Current = 1001, Target = 1017, Category = "1" });
            model.hPa.Add(new BulletChartItem() { Current = 1005, Target = 1024, Category = "2" });
            model.hPa.Add(new BulletChartItem() { Current = 1016, Target = 1026, Category = "3" });
            model.hPa.Add(new BulletChartItem() { Current = 1019, Target = 1030, Category = "4" });
            model.hPa.Add(new BulletChartItem() { Current = 1004, Target = 1013, Category = "5" });
            model.hPa.Add(new BulletChartItem() { Current = 998, Target = 1020, Category = "6" });
            model.hPa.Add(new BulletChartItem() { Current = 987, Target = 1013, Category = "7" });
            model.hPa.Add(new BulletChartItem() { Current = 1006.5, Target = 1010, Category = "8" });
            model.hPa.Add(new BulletChartItem() { Current = 1020, Target = 1023, Category = "9" });
            model.hPa.Add(new BulletChartItem() { Current = 1035, Target = 1044, Category = "10" });
            model.hPa.Add(new BulletChartItem() { Current = 1025, Target = 1026, Category = "11" });
            model.hPa.Add(new BulletChartItem() { Current = 1013, Target = 1017, Category = "12" });
            model.hPa.Add(new BulletChartItem() { Current = 1017, Target = 1023, Category = "13" });
            model.hPa.Add(new BulletChartItem() { Current = 1010, Target = 1021, Category = "14" });

            return View(model);
        }
    }
}