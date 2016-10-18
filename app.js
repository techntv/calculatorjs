$(function () {
    var getItemOnScreen = '';
    var equal = 0;
    var regexNumber = /(\d{0,10}\.?\d{1,10})/gi;
    var regexSign = /[^\.\d\w]/g;
    var numberItem = [];
    var signItem = [];
    var inputOnScreen = $('.screen');
    var operator = {
        plus : function(val1,val2){
          return (val1+val2).toFixed(2);
        },
        subtract : function(val1,val2){
          return (val1-val2).toFixed(2);
        },
        multiple : function(val1,val2){
          return (val1*val2).toFixed(2);
        },
        divide : function(val1,val2){
          return (val1/val2).toFixed(2);
        },
    };
    function calculator(arr, total){
      arr.splice(0, 2);
      arr.unshift(total);
    }

    function equalDisplay() {
      inputOnScreen.attr('value', equal);
      getItemOnScreen = equal ;
    }


    $('span').click(function () {
        var item = $(this).text();
        getItemOnScreen += item;

        switch (item) {
          case 'AC':
          case 'CE':
              getItemOnScreen = '';
              inputOnScreen.attr('value', getItemOnScreen);
            break;
          case "sqrt":
              numberItem = getItemOnScreen.match(regexNumber);
              equal = (Math.sqrt(Number(numberItem[0]))).toFixed(2);
              equalDisplay();
              break;
          case "1/x":
              numberItem = getItemOnScreen.match(regexNumber);
              numberItem[0] = numberItem[0].substring(0,numberItem[0].length - 1);
              equal = (1/(Number(numberItem[0]))).toFixed(3);
              equalDisplay();
              break;
          case '=':
              numberItem = getItemOnScreen.match(regexNumber);
              signItem = getItemOnScreen.match(regexSign);
              signItem.splice(signItem.length - 1);

              var numberItemOne = Number(numberItem[0]);
              var numberItemTwo = Number(numberItem[1]);

              signItem.forEach(function (item) {
                  switch (item) {
                  case "+":
                      equal = operator.plus(numberItemOne,numberItemTwo);
                      calculator(numberItem,equal);
                      break;
                  case "-":
                      equal = operator.subtract(numberItemOne,numberItemTwo);
                      calculator(numberItem,equal);
                      break;
                  case "*":
                      equal = operator.multiple(numberItemOne,numberItemTwo);
                      calculator(numberItem,equal);
                      break;
                  case "/":
                      equal = operator.divide(numberItemOne,numberItemTwo);
                      calculator(numberItem,equal);
                      break;
                  default:
                      return false;
                  }
              }); // end for each
              equalDisplay();
              break;
          default:
              inputOnScreen.attr('value', getItemOnScreen);
              break;
        }
    }); // end button not equal
});
