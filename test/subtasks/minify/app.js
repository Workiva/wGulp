var Hat = (function () {
    function Hat(greeting) {
        this.greeting = greeting;
    }
    Hat.prototype.go = function () {
        return this.greeting;
    };
    return Hat;
})();

module.exports = Hat;
