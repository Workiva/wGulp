var Paw = require('paw/Paw');
var Train = require('paw/Train');

describe("pawSpec", function() {

  var paw;

  beforeEach(function() {
    paw = new Paw();
    // you could mix in some app specific things into this paw instance
    var extraStuff = {
      extra: function(done) {
        this.tap('#theButton2');
        done();
      }
    };
    Train.mixObjectInto(paw, extraStuff);
  });

  it("should use have extra stuff", function() {

      expect(paw.extra).toBeDefined();

  });

  it("should click theButton2", function() {
      paw.extra();
      expect(window._clicked).toBe('theButton2');
  });

});
