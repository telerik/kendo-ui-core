(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge placement', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        var positions = [ 'top start', 'top end', 'bottom start', 'bottom start' ];
        var defaultPositions = [ 'inline', ''];
        var placements = [ 'outside', 'inside'];
        var defaultPlacements = [ 'edge', '' ];

        // #region badge.options.placement = 'inside|outside'
        placements.forEach(function(placement) {
            positions.forEach(function(position) {
                test(`badge.options.position '${position}' with placement '${placement}' sets correct classNames`, function() {
                    badge = new Badge(span, { position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${placement}-${position.replace(' ', '-')}`), true);
                    assert.equal(badge.element.hasClass(`k-badge-${position.replace(' ', '-')}`), false);
                });
            });

            defaultPositions.forEach(function(position) {
                test(`badge.options.position '${position}' with placement '${placement}' does not set classNames`, function() {
                    badge = new Badge(span, { position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${placement}-${position}`), false);
                });
            });
        });
        // #endregion


        // #region badge.options.placement = 'edge|'
        defaultPlacements.forEach(function(placement) {
            positions.forEach(function(position) {
                test(`badge.options.position '${position}' with placement '${placement}' sets correct classNames`, function() {
                    badge = new Badge(span, { position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${position.replace(' ', '-')}`), true);
                });
            });

            defaultPositions.forEach(function(position) {
                test(`badge.options.position '${position}' with placement '${placement}' does not set classNames`, function() {
                    badge = new Badge(span, { position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${position}`), false);
                });
            });
        });
        // #endregion


        // #region setOptions
        placements.forEach(function(placement) {
            positions.forEach(function(position) {
                test(`badge.setOptions({position: '${position}', placement: '${placement}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { position: 'position', placement: 'placement' });

                    badge.setOptions({ position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${placement}-${position.replace(' ', '-')}`), true);
                    assert.equal(badge.element.hasClass(`k-badge-${position.replace(' ', '-')}`), false);
                });
            });

            defaultPositions.forEach(function(position) {
                test(`badge.setOptions({position: '${position}', placement: '${placement}'}) does not set classNames`, function() {
                    badge = new Badge(span, { position: 'position', placement: 'placement' });

                    badge.setOptions({ position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${placement}-${position}`), false);
                });
            });
        });
        defaultPlacements.forEach(function(placement) {
            positions.forEach(function(position) {
                test(`badge.setOptions({position: '${position}', placement: '${placement}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { position: 'position', placement: 'placement' });

                    badge.setOptions({ position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${position.replace(' ', '-')}`), true);
                });
            });

            defaultPositions.forEach(function(position) {
                test(`badge.setOptions({position: '${position}', placement: '${placement}'}) does not set classNames`, function() {
                    badge = new Badge(span, { position: 'position', placement: 'placement' });

                    badge.setOptions({ position: position, placement: placement });

                    assert.equal(badge._placement, placement);
                    assert.equal(badge._position, position);
                    assert.equal(badge.element.hasClass(`k-badge-${position}`), false);
                });
            });
        });
        // #endregion

    });

})();
