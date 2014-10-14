var add, subtract, my_num;
add = function(base, num){
  num == null && (num = 1);
  return base + num;
};
subtract = function(base, num){
  num == null && (num = 1);
  return base - num;
};
my_num = add(subtract(5), 6);
