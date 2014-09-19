
describe("lilSpec", function() {

  it("should be able to execute a test", function() {

      var button = document.getElementById('theButton');
      expect(button.innerHTML).toEqual('Whatever');

  });

});
