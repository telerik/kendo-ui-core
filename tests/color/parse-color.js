(function() {
      var parseColor = kendo.parseColor;

      describe("Color", function () {

      it("Convert desaturated color to HSV", function(){
          assert.equal(parseColor("#000").toHSV().toCss(), "#000000");
          assert.equal(parseColor("#888").toHSV().toCss(), "#888888");
          assert.equal(parseColor("#fff").toHSV().toCss(), "#ffffff");
          assert.equal(parseColor("#fff").toHSV().h, 0);
      });

      it("Short hex notation", function(){
          var color = parseColor("#ff0");
          assert.isOk(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("#0f0");
          assert.isOk(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("#0ff");
          assert.isOk(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("#000");
          assert.isOk(/^#000000/i.test(color.toCss()));

          var color = parseColor("#234");
          assert.isOk(/^#223344/i.test(color.toCss()));
      });

      it("Long hex notation", function(){
          var color = parseColor("#ffff00");
          assert.isOk(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("#00ff00");
          assert.isOk(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("#00ffff");
          assert.isOk(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("#000000");
          assert.isOk(/^#000000/i.test(color.toCss()));

          var color = parseColor("#223344");
          assert.isOk(/^#223344/i.test(color.toCss()));
      });

      it("RGB notation", function(){
          var color = parseColor("rgb(255, 255, 0)");
          assert.isOk(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("rgb(  0,255, 0  )");
          assert.isOk(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("rgb( 0000,255,0255\t)");
          assert.isOk(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("rgb( 0,\t00,000)");
          assert.isOk(/^#000000/i.test(color.toCss()));

          var color = parseColor("rgb(34,51,68)");
          assert.isOk(/^#223344/i.test(color.toCss()));
      });

      it("RGBA notation", function(){
          var color = parseColor("rgba(255, 255, 0, 1)");
          assert.isOk(/^#ffff00/i.test(color.toCss()));

          var color = parseColor("rgba(  0,255, 0  , 01  )");
          assert.isOk(/^#00ff00/i.test(color.toCss()));

          var color = parseColor("rgba( 0000,255,0255\t, 1\t)");
          assert.isOk(/^#00ffff/i.test(color.toCss()));

          var color = parseColor("rgba( 0,\t00,000,1)");
          assert.isOk(/^#000000/i.test(color.toCss()));

          var color = parseColor("rgba(34,51,68,1)");
          assert.isOk(/^#223344/i.test(color.toCss()));
      });
    });
}());
