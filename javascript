var myModule = (function(){

  var fibNum = 0;

  function fib(n) {
    if(n <= 1)
      return 1
    return fib(n-2) + fib(n-1);
	}

  my.moduleMethod = function (n) {
		this.fibNum = fib(n);
  };

  return fibNum;

})();

var img = document.querySelector('[name=stuff]');

img.addEventListener('');

var s = {sdsd: 'yyjhj'}
