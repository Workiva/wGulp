
describe("anotherSpec", function() {

  it("should be able to execute another test", function() {

      var button2 = document.getElementById('theButton2');
      expect(button2.innerHTML).toEqual('Whatever2');

  });

});
