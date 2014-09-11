var add, my_num, subtract;

add = function(base, num) {
  if (num == null) {
    num = 1;
  }
  return base + num;
};

subtract = function(base, num) {
  if (num == null) {
    num = 1;
  }
  return base - num;
};

my_num = add(subtract(5), 6);
