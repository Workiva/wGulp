var Person = (function () {
    function Person(firstname, middleinitial, lastname) {
        this.firstname = firstname;
        this.middleinitial = middleinitial;
        this.lastname = lastname;
        this.fullname = firstname + ' ' + middleinitial + ' ' + lastname;
    }
    return Person;
})();

module.exports = Person;
//# sourceMappingURL=Person.js.map
