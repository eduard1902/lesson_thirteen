'use strict';

const start = document.getElementById('start'); 
const cancel = document.getElementById('cancel');                                
let btnPlus = document.getElementsByTagName('button');  
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let depositCheck = document.querySelector('#deposit-check');                        //Чекбокс 
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');     // Ввода возможных доходов
let salaryAmount = document.querySelector('.salary-amount');                        //Месячный доход*
// let incomeInput = document.querySelector('.income-title');                        //Дополнительный доход- наименование
// let amountInput = document.querySelector('.income-amount');                      //Дополнительный доход- сумма
let additionalInputncome1 = document.querySelectorAll('.additional_income-item')[0]; //Возможный доход
let additionalInputncome2 = document.querySelectorAll('.additional_income-item')[1]; //Возможный доход
let expensesTitle = document.querySelector('.expenses-title'); 
let expensesItems = document.querySelectorAll('.expenses-items');                   // Обязательные расходы
//let expensesAmount = document.querySelector('.expenses-amount');                  // Обязательные расходы - сумма
let additionalExpensesItem = document.querySelector('.additional_expenses-item');   //Возможные расходы 
let targetAmount = document.querySelector('.target-amount');                        // Цель
let periodSelect = document.querySelector('.period-select');                        // Период расчета
let periodAmount = document.querySelector('.period-amount');
let resultTotal = document.querySelector('.result-total');                          // Доход за месяц
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');                   // Дневной бюджет
let expensesMonthValue = document.querySelector('.expenses_month-value');           //Расход за месяц
let additionalIncomeValue = document.querySelector('.additional_income-value');     //Возможные доходы
let additionalExpensesValue = document.querySelector('.additional_expenses-value'); //Возможные расходы 
let incomePeriodValue = document.querySelector('.income_period-value');             // Накопления за период 
let targetMonthValue = document.querySelector('.target_month-value');               //Срок достижения цели в месяцах
let incomeItems = document.querySelectorAll('.income-items');



    //LESSON 1-8
console.log(additionalIncomeItem);
console.log(incomeItems);

let isText = function(str) {
    let pattern = new RegExp('[^а-яё\S]', 'gi');
    return str.match(pattern);
}

let isString = function(s){
    return (typeof s) === 'string' && s !== '';
}
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],// дополнительные доходы
    expenses: {}, // дополнительные расходы
    addExpenses: [], // возможные расходы
    deposit: false, 
    percentDeposit: 0,
    moneyDeposit: 0,
   
    
    start: function() {
        if(salaryAmount.value === '') {
            start.setAttribute('disable', true);
            return;
        } else {
            start.setAttribute('disable', false);
        }

        let allInput = document.querySelectorAll('.data input[type = text]');
        
        allInput.forEach(function(item){
            item.setAttribute('disabled','true');
        });

        expensesPlus.setAttribute('disabled','true');
        incomePlus.setAttribute('disabled','true');
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;
        console.log('salaryAmount.value', salaryAmount.value);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        
  console.log(this);
    },

    reset:function() {

        let dataAllInput = document.querySelectorAll('.data input[type = text]');
        
        let resultInputAll = document.querySelectorAll('.result input[type = text]');
        
        dataAllInput.forEach(function(elem){
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function(elem){
            elem.value = '';
        });


        for(let i = 0; i < incomeItems.length; i++){
            if(i>0) {
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
                incomePlus.style.display = 'block';
            }
        }


        for(let i = 0; i < expensesItems.length; i++){
            if(i>0) {
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
                expensesPlus.style.display = 'block';
            }
        }
        start.style.display = 'block';
        cancel.style.display = 'none'; 
        expensesPlus.removeAttribute('disabled');
        incomePlus.removeAttribute('disabled');
        depositCheck.checked = false;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {}; 
        this.addExpenses = [];
        this.deposit = false; 
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        
    },

    showResult:function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        targetAmount.value = this.getTargetMonth();
        incomePeriodValue.value = appData.calsSaveMoney();
    },
    addExpensesBlock: function() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
           }
        });
    },

    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },

    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !=='' &&  cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        });
        
    }, 
    
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if (item !== ''){
            appData.addExpenses.push(item);
          }
        });
      },
      getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if (itemValue !== ''){
            appData.addIncome.push(itemValue);
          }
        });
      },
        //Сумма расходов
        getExpensesMonth: function() {
            for (let key in this.expenses) {
                 this.expensesMonth += +this.expenses[key];
            }

            console.log('Расходы за месяц ' + this.expensesMonth + ' рублей');
        },

        // Бюджет в месяц и день
        getBudget: function() {
            this.budgetMonth =  this.budget + +this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        },

        // Достижение цели
        getTargetMonth: function() {
            return (Math.ceil(targetAmount.value / this.budgetMonth));
        },

        // Уровень дохода
        getStatusIncome: function() {
            if (appData.budgetDay > 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (600 < appData.budgetDay){ 
            console.log('У вас средний уровень дохода');
            } else if (0 < appData.budgetDay) {
                console.log('У вас средний уровень дохода');
            } else if (0 > appData.budgetDay) {
                console.log('Что то пошло не так');
            }
        },
        
        // Deposit in bank
        getInfoDeposit: function() {
            if (appData.deposit) {
                do {
                    appData.percentDeposit = prompt('Какой годовой процент?', '10'); 
                } 
                while(!isText(appData.percentDeposit));
                do {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }
                while(!isText(appData.moneyDeposit));
            }
        },
        updatePeriod: function(){
            periodAmount.innerHTML = periodSelect.value;
            incomePeriodValue.value = appData.calsSaveMoney();
        },
        calsSaveMoney: function() {
            return this.budgetMonth * periodSelect.value;
            
        },
       
};

start.addEventListener('click', appData.start.bind(appData));

cancel.addEventListener('click', appData.reset.bind(appData));


incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.updatePeriod);


