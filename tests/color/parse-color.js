(function() {
      var parseColor = kendo.parseColor;

      test("Convert desaturated color to HSV", function(){
          equal(parseColor("#000").toHSV().toCss(), "#000000");
          equal(parseColor("#888").toHSV().toCss(), "#888888");
          equal(parseColor("#fff").toHSV().toCss(), "#ffffff");
          equal(parseColor("#fff").toHSV().h, 0);
      });

      test("Short hex notation", function(){
          var color = parseColor("#ff0");
          ok(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("#0f0");
          ok(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("#0ff");
          ok(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("#000");
          ok(/^#000000/i.test(color.toCss()));

          var color = parseColor("#234");
          ok(/^#223344/i.test(color.toCss()));
      });

      test("Long hex notation", function(){
          var color = parseColor("#ffff00");
          ok(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("#00ff00");
          ok(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("#00ffff");
          ok(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("#000000");
          ok(/^#000000/i.test(color.toCss()));

          var color = parseColor("#223344");
          ok(/^#223344/i.test(color.toCss()));
      });

      test("RGB notation", function(){
          var color = parseColor("rgb(255, 255, 0)");
          ok(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("rgb(  0,255, 0  )");
          ok(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("rgb( 0000,255,0255\t)");
          ok(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("rgb( 0,\t00,000)");
          ok(/^#000000/i.test(color.toCss()));

          var color = parseColor("rgb(34,51,68)");
          ok(/^#223344/i.test(color.toCss()));
      });

      test("RGBA notation", function(){
          var color = parseColor("rgba(255, 255, 0, 1)");
          ok(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("rgba(  0,255, 0  , 01  )");
          ok(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("rgba( 0000,255,0255\t, 1\t)");
          ok(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("rgba( 0,\t00,000,1)");
          ok(/^#000000/i.test(color.toCss()));

          var color = parseColor("rgba(34,51,68,1)");
          ok(/^#223344/i.test(color.toCss()));
      });
})();
