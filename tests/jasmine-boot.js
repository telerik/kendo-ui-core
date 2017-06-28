window.jasmine = jasmineRequire.core(jasmineRequire);

var env = jasmine.getEnv();

jasmine.clock = function() {
    return env.clock;
};
