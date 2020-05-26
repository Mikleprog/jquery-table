/--- Search
function tableSearch() {
  var phrase = document.getElementById('search-text');
  var table = document.getElementById('grid');
  var regPhrase = new RegExp(phrase.value, 'i');
  var flag = false;
  for (var i = 1; i < table.rows.length; i++) {
      flag = false;
      for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
          flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
          if (flag) break;
      }
      if (flag) {
          table.rows[i].style.display = "";
      } else {
          table.rows[i].style.display = "none";
        }
  }
}
//sort
let trend;
function sort () {
  document.getElementById("sortNameUp").hidden= !document.getElementById("sortNameUp").hidden
  let b= (trend||1);
  trend = -b;
  let tbody = document.querySelector('tbody');
  let rowsArray = Array.from(tbody.rows)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? b : -b);
  tbody.append(...rowsArray);
} 


let dir;
function sortPrice () {
  document.getElementById("upPrice").hidden= !document.getElementById("upPrice").hidden
  let b= (dir||1);
  dir = -b;
  let body = document.querySelector('tbody');
  let rowsAr = Array.from(body.rows)
  .sort((rowA, rowB) =>extractCurrencyValue(rowA.cells[1]
  .innerHTML)> extractCurrencyValue(rowB.cells[1].innerHTML) ? 1 : -1 );
  body.append(...rowsAr);
} 

//--- check box for select all cities
function check (){
  let elements = document.querySelectorAll("input[type='checkbox']"); 
    for (let element of elements) {
      if (document.getElementById('all').checked) {
        element.checked = true;
        } else {
            element.checked = false;
      }
    }
}

//  check box for Delivery with needed cities :)
function showCity() {
  document.getElementById('selectAll').style.visibility = "visible";
  let e = document.getElementById("delivery");
  let text = e.options[e.selectedIndex].text;
  let i=0;
  for(let label of document.querySelectorAll('[show-info]')) {
    label.innerHTML = delivery[text][i];
    i=i+1;
  } 
}

let delivery = {
  Russia:['Moscow', 'St. Petersburg', 'Saratov'], 
  Belorus:['Brest','Minsk','Gomel'],
  USA:['Boston', 'New Jersy','Newtown']};


var products = [{
  name: "Plane",
  price: 15,
  email: 'example1@example.com',
  count: 7,
  country:'Russia', city1: 'Moscow', city2:'St. Petersburg', 
}, {
  name: "Hammer",
  price: 1700,
  email: 'example2@example.com',
  count: 127,
  country:'Belorus', city1: 'Brest', city2:'Minsk', city3:'Gomel'
}, {
  name: "Pumping set",
  price: 1276.89,
  email: 'exampl32@example.com',
  count: 4,
  country:'USA', city1: 'Bosston', city2:"New Jersy"
},{
  name: "Shovel",
  price: 10,
  email: 'exampl33@example.com',
  count: 20,
  country:'Russia', city1: "Saratov"
}];

//fill the table
tableOfProducts();

function tableOfProducts(){
  var tmpl = document.getElementById('grid-template').innerHTML.trim();
tmpl = _.template(tmpl);

document.getElementById('grid-holder').innerHTML = tmpl({
  list: products
  }); 
 }

function extractCurrencyValue(str) {
  if (str)
  return +str.slice(1).split(',').join('');
}

function numberToCurrency(number) {
  if (number){
   var gasPrice = new Intl.NumberFormat("en-US",
   { style: "currency", currency: "USD",
   minimumFractionDigits: 2 });
   return gasPrice.format(number);
  }
}

/// check input forms

////focus 
$('#myForm').bind('submit', function(event) {
  $('.form-control').each(function() {
    if(!$(this).val().length) {	
      $(this).focus();  
      return false;
    }
  });
});

////remove red border when change the value  
$(':input').change(function(){
  $(this).removeClass('error')
  .next('span')
  .remove();
});

////number to the currency $
$("#price").blur(function(){
  let t = $(this).val();
  $(this).attr('type','text');
  let b=  $('#price').val(numberToCurrency(t)); 
});

///currency to number
$("#price").focus(function(){
  let value = extractCurrencyValue($(this).val());
  $(this).attr('type','number');
  $('#price').val(value); 
});


 // submit( without submit)
 
$('#myForm').bind('submit', function(event) {
  var count=0;
  $('.form-control')
  .each(function() {
   if(!$(this).val().length) {	
     event.preventDefault();
     $(this).removeClass('error')
     .next('span')
     .remove();
     $(this).addClass('error')
     .after('<span class = "error"> This field must...</span>');
     count++;
    }
  });
  
 
  $('#name').each(function() {
    if($(this).val().length>15 ) {	
      event.preventDefault();
      $(this).removeClass('error')
      .next('span')
      .remove();
      $(this).addClass('error')
      .after('<span class = "error"> Name max length is 15 characters</span>');
      
      count++
    }
    if($(this).val().length < 5 && $(this).val().length != 0 ) {	
      event.preventDefault();
      $(this).removeClass('error')
      .next('span')
      .remove();
      $(this).addClass('error')
      .after('<span class = "error"> Name min length is 5 characters</span>');
      count++;
    }
     
    if(!(/\S/g).test($(this).val())){
      event.preventDefault();
      $(this).removeClass('error')
      .next('span')
      .remove();
      $(this).addClass('error')
      .after('<span class = "error"> This field must...</span>');
      count++
    }
  });
  $('#email').each(function() {
    var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailRegExp.test($(this).val())&& $(this).val().length != 0) {	
      event.preventDefault();
      $(this).removeClass('error')
      .next('span')
      .remove();
      $(this).addClass('error')
      .after('<span class = "error"> Enter your email addres</span>');
      count++;
    }
  });

  $('#price').each(function() {
    if((extractCurrencyValue($(this).val())==0)||(/-/).test($(this).val())) {	
     event.preventDefault();
      $(this).removeClass('error')
      .next('span')
      .remove();
      $(this).addClass('error')
      .after('<span class = "error"> This fild must ...</span>');
      count++
    }
  });
  $('#price').each(function() {
    ///  this regexp is not correct
    if(extractCurrencyValue($(this).val())==0||(/-/).test($(this).val())) {	
      event.preventDefault();
      $(this).removeClass('error')
      .next('span')
      .remove();
      $(this).addClass('error')
      .after('<span class = "error"> This fild must ...</span>');
      count++
    }
  });

  let item = {};
  item.name = $('#name').val();
  item.price = extractCurrencyValue($('#price').val());
  item.email = $('#email').val();
  item.count = $('#count').val();
  item.country = $('#delivery').val();
  if ($('#box1').is(':checked')){
   item.city1 = document.getElementById('valuebox1').innerHTML;
  } 
  if ($('#box2').is(':checked')){
    item.city2 = document.getElementById('valuebox2').innerHTML;
  } 
  if ($('#box3').is(':checked')){
    item.city3 = document.getElementById('valuebox3').innerHTML;
  }
  if (indexEditItem!=-1){ 
    if (count ==0){
    products.splice(indexEditItem,1,item);
    indexDeliteItem =-1;
    }
  } else { if (count ==0){
      products.push(item);
    }
     // var serialObj = JSON.stringify(item); 
      //localStorage.setItem("myKey", serialObj);
  }
    
  
  // could not finde solutions for reload of the page        
  event.preventDefault();
    if (count ===0){
    tableOfProducts();
    $('#myModal1').modal('toggle');
    }
});

/*
function testNumber(){
  var returnObj=JSON.parse(localStorage.getItem("myKey"));
   products.push(returnObj);
   tableOfProducts();
 
}*/

let indexDeliteItem;
function indexOfDeliteItem() {
  $('td').on('click', function () {
    var $td = $(this),
    $tr = $td.parent();
    indexDeliteItem = $tr.index();
    document.getElementById('deliteProductName').innerHTML = "Are you shure you want to delite"
     +" " + products[$tr.index()].name + "?";
  });
}

function deleteCurrentItem() {
  products.splice(indexDeliteItem,1);
  tableOfProducts();
}

let indexEditItem = -1;
function editTheCurrentItem() {
  $('td').on('click', function () {
        var $td = $(this),
    $tr = $td.parent();
    indexEditItem = $tr.index();
   $('#name').val(products[indexEditItem].name);
   $('#price').val(numberToCurrency(products[indexEditItem].price));
   $('#email').val(products[indexEditItem].email);
   $('#count').val(products[indexEditItem].count);
   $('#delivery').val(products[indexEditItem].country);
      showCity();
   (products[indexEditItem].city1) ? $('#box1').prop('checked', true): $('#box1').prop('checked', false);
   (products[indexEditItem].city2) ? $('#box2').prop('checked', true) : $('#box2').prop('checked', false);
   (products[indexEditItem].city3) ? $('#box3').prop('checked', true) : $('#box3').prop('checked', false);
   
  });
}


$('#myModal1').on('hidden.bs.modal', function (e) {
 document.getElementById("myForm").reset();
});
