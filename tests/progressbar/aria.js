(function() {
    var ProgressBar = kendo.ui.ProgressBar,
        container;

    describe('kendo.ui.ProgressBar accessibility', function() {
        beforeEach(function() {
            container = document.createElement("div");
            $(container).appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var pb = $(container).data("kendoProgressBar");

            if (pb && pb.destroy) {
                pb.destroy();
            }

            kendo.destroy(Mocha.fixture);
        });

        it('ProgressBar is accessible', function(done) {
            var pb = new ProgressBar(container, {
                label: "progress",
                ariaRole: true
            });

            axeRunFixture(done);
        });

        it('ProgressBar of type chunk is accessible', function(done) {
            var pb = new ProgressBar(container, {
                type: "chunk",
                value: 2,
                chunkCount: 5,
                min: 0,
                max: 5,
                label: "progress",
                ariaRole: true
            });

            axeRunFixture(done);
        });

        it('ProgressBar of type percent is accessible', function(done) {
            var pb = new ProgressBar(container, {
                type: "percent",
                value: 2,
                min: 0,
                max: 5,
                label: "progress",
                ariaRole: true
            });

            axeRunFixture(done);
        });

        it('ProgressBar gets proper role', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                ariaRole: true
            });

            assert.equal(pb.wrapper.attr("role"), "progressbar");
        });

        it('ProgressBar gets proper aria-label', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                ariaRole: true
            });

            assert.equal(pb.wrapper.attr("aria-label"), "progress");
        });

        it('ProgressBar gets proper aria-labelledby', function() {
            var label = $("<label id='label'>label</label>");

            label.appendTo(Mocha.fixture);

            var pb = new ProgressBar(container, {
                labelId: "label",
                ariaRole: true
            });

            assert.equal(pb.wrapper.attr("aria-labelledby"), label.attr("id"));
        });

        it('ProgressBar gets proper aria-valuemin and aria-valuemax', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                min: -10,
                max: 10,
                ariaRole: true
            });

            assert.equal(pb.wrapper.attr("aria-valuemin"), "-10");
            assert.equal(pb.wrapper.attr("aria-valuemax"), "10");
        });

        it('ProgressBar gets proper aria-valuenow', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                min: -10,
                max: 10,
                ariaRole: true,
                animation: false
            });

            assert.equal(pb.wrapper.attr("aria-valuenow"), "0");

            pb.value(5);

            assert.equal(pb.wrapper.attr("aria-valuenow"), "5");
        });

        it('ProgressBar does not set aria-valuenow when value is set to false', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                min: -10,
                max: 10,
                value: false,
                ariaRole: true
            });

            assert.equal(pb.wrapper.attr("aria-valuenow"), undefined);
        });
    });

    describe('kendo.ui.ProgressBar announce element', function() {
        beforeEach(function() {
            container = document.createElement("div");
            $(container).appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var pb = $(container).data("kendoProgressBar");

            if (pb && pb.destroy) {
                pb.destroy();
            }

            kendo.destroy(Mocha.fixture);
        });

        it('ProgressBar announce element accessible', function(done) {
            var pb = new ProgressBar(container, {
                label: "progress",
                ariaRole: true
            });

            axeRun(pb.announce, done);
        });

        it('ProgressBar updates the contents of its announce element accordingly', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                min: -10,
                max: 10,
                ariaRole: true,
                animation: false
            });

            assert.equal(pb.announce.text(), "50%");

            pb.value(5);

            assert.equal(pb.announce.text(), "75%");
        });

        it('announce element has k-sr-only class', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                min: -10,
                max: 10,
                ariaRole: true
            });

            assert.isOk(pb.announce.hasClass("k-sr-only"));
        });

        it('announce element has aria-live="polite" class', function() {
            var pb = new ProgressBar(container, {
                label: "progress",
                min: -10,
                max: 10,
                ariaRole: true
            });

            assert.equal(pb.announce.attr("aria-live"), "polite");
        });
    });
}());