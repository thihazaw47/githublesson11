//GET UI
const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form');
const gettranstatuses = document.querySelectorAll('.form-check-input');
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const openbtn = document.getElementById('open-btn');
const gethisbox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');


const dummydatas = [
		{id:1,transtatus:"+",amount:1000,date:"2023-01-20",remark:'Petty Cash'},
		{id:2,transtatus:"-",amount:-20,date:"2023-01-21",remark:'Pen'},
		{id:3,transtatus:"+",amount:300,date:"2023-01-25",remark:'Other Income'},
		{id:4,transtatus:"-",amount:-10,date:"2023-01-25",remark:'Book'},
		{id:5,transtatus:"-",amount:-150,date:"2023-01-25",remark:'Water'},
		{id:6,transtatus:"-",amount:-100,date:"2023-01-25",remark:'Teamix'}
	];

// console.log(dummydatas);

// *****
const getlsdatas =  JSON.parse(localStorage.getItem('transactions'));
let gethistories = localStorage.getItem('transactions') !== null ? getlsdatas : [];  // transaction m shi yin array a khan a loot , shi yin Json array format pyaung htr pe thr ko y pe , 
																					// ayin ka tot if statement nae sitt tr


//Initial App
function init(){
	getlistgroup.innerHTML = '';

	// Method 1
	// dummydatas.forEach(function(dummydata){
	// 	console.log(dummydata);
	// 	addtoui(dummydata);
	// });

	// Method 2  
	// dummydatas.forEach(dummydata=>addtoui(dummydata));

	// Method 3  *****
	// dummydatas.forEach(addtoui);

	gethistories.forEach(addtoui);

	totalvalue(); 				// dr m kaw yin history list ka ta ku del lae balance,debit,credit mr lite m change 
}



init();


//Create li to ul
function addtoui(transaction){
	// console.log(transaction);		// transition ta ku chin si object a nay nae win lr pe
	// console.log(transaction.amount , typeof transaction.amount); // 1000 'number'

	const newli = document.createElement('li');
														// -- m phyit ag Math.abs() use
	newli.innerHTML = `${transaction.remark} <span>${transaction.transtatus}${Math.abs(transaction.amount)}</span><span>${transaction.date}</span><button type="button" class="delete-btn" onclick="removetransaction(${transaction.id})">&times;</button>`;

	newli.className = 'list-group-item';			// css effect win ag , li ko kaw pe pay yin dr pay sayr m lo , list-group-item so pe css mr pay htr lox  list-group-item htae tr

	newli.classList.add(transaction.transtatus === "+" ? 'inc' : 'dec');  	
	
	//console.log(newli);

	getlistgroup.appendChild(newli);


}



var sign = "-";

//Get Sign
gettranstatuses.forEach(function(gettranstatus){
	gettranstatus.addEventListener('change',function(){ 		// click or change any , change so yin tot htet nate yin m htwet tot  
		//console.log(this.value);

		if(this.value === "debit"){
			sign = "+";
		}else if(this.value === "credit"){
			sign = "-";
		}
	});

});


function newtransaction(e){
	// console.log('hay');
	// console.log(sign);

	if(isNaN(getamount.value) || getamount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === '' ){
		
		alert('Ohh!!! Some data are missing.');

	}else{
		const transaction = {
			id:generateidx(), 
			transtatus:sign,
			amount:sign === "-" ? Number(-getamount.value) : Number(getamount.value), 
			date:getdate.value, 
			remark:getremark.value
		};

		// console.log(transaction);

		gethistories.push(transaction);		// transactions so tae kg local storage htae mr m shi lox [] array a loot ti saunt lite pe 
											// array phyit pe so tot array method use loh y pe

		addtoui(transaction);

		totalvalue();						// transaction ta ku htae tai dr ko invoke lote say chin lox d mr htae tr

		updatelocalstorage();

		getamount.value = '';
		getdate.value = '';
		getremark.value = '';

		getamount.focus();					

	}

	e.preventDefault();

}


//Update Local Storage
function updatelocalstorage(){
	localStorage.setItem('transactions',JSON.stringify(gethistories));
}

function generateidx(){
	return Math.floor(Math.random() * 100000);
}

// console.log(generateidx());

function totalvalue(){
	const amounts = gethistories.map(gethistory=>gethistory.amount);
	// console.log(amounts);

	// Method 1
	// const result = amounts.reduce(function(total,curvalue){
	// 	total += curvalue;
	// 	return total;
	// },0).toFixed(2);

	//Method 2
	const totalresult = amounts.reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);

	const debitresult = amounts.filter(amount=>amount > 0).reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);

	const creditresult = (amounts.filter(amount=>amount < 0).reduce((total,curvalue)=>(total += curvalue),0)* -1).toFixed(2);

	balance.innerText = `${totalresult}`;
	moneydeb.textContent = `${debitresult}`;
	moneycrd.textContent = `${creditresult}`;

	// console.log(totalresult);
	// console.log(debitresult);
	// console.log(creditresutl);
};

// totalvalue();    // sann tr dr ka

function removetransaction(tranid){
	gethistories = gethistories.filter(gethistory => gethistory.id !== tranid);

	init(); 				// ui paw mr phaw pya tae step

	updatelocalstorage();		// ls mr twr pyaung tr
}


openbtn.addEventListener('click',function(){
	gethisbox.classList.toggle('show');
});

getform.addEventListener('submit',newtransaction);


// 25TR




// var myarrs = [10,20,30,40,50,60,70,80,90,100];

// // array.reduce(function(total,currentValue,currentIndex,array){},initialvalue);

// var result = myarrs.reduce(function(total,curvalue,curidx,arr){
// 	console.log('this is total = ',total);  //(1)0 (9)undefined  //if we use 1 parameter (1)10 (9)undefined
// 	console.log('this is curvalue = ',curvalue); // 10 to 100 by number   //if we use 1 parameter 20 to 100 by number
// 	console.log('this is curidx = ',curidx);  //0 to 9 index number  //if we use 1 parameter 1 to 9 index number
// 	console.log(arr); // array [10,..,100]  so tr myo 10 khu htwet mr  // if we use 1 parameter [10,..,100] so tr myo 9 khu htwet 

// 	total += curvalue;   // total ka 0 , curvalue ka 10 to 100 

// 	return total;		// 550

// },0);

// console.log(result);

