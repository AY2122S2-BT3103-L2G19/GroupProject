<template>
<div class = "main_container">
        <form id = "myform">
            <h2>Adding Transactions</h2>

            <div class = "expenses_form">

                <div class = "all_transaction_options">
                    <div><button id = "income_option_button" type = "button" v-on:click = "inputTransactionType(1)"> Income </button></div>
                    <div><button id = "expenses_option_button" type = "button" v-on:click = "inputTransactionType(2)"> Expenses </button></div>
                    <div><button id = "owed_payment_option_button" type = "button" v-on:click = "inputTransactionType(3)"> Owed Payments </button></div>
                </div>

                <div class = "container1">
                    <br><br>
                    <label for = "amount">Amount: </label>
                    <input type = "number" id = "amount" required = "" placeholder = "Enter Amount"> 

                    <br><br>
                    <br><br>

                    <label for = "transaction_name">Transaction Name: </label>
                    <input type = "text" id = "transaction_name" required = "" placeholder = "Enter Name of Transaction"> 

                    <br><br>
                    <br><br>

                    <label for = "category">Category: </label>
                    <input type = "text" id = "category" required = "" placeholder = "Enter Category">
                </div>

                <div class = "container2">
                    <br><br>
                    <label for = "date_input">Date of Expense: </label>
                    <input type = "date" id = "date_input" required = "" placeholder = "Enter Date">

                    <br><br>
                    <br><br>

                    <label for = "date_of_return">Date of Return: </label>
                    <input type = "date" id = "date_of_return" required = "" placeholder = "Enter Date of Return">

                    <br><br>
                    <br><br>

                    <label for = "recurring">Recurring?: </label>
                    <input type = "text" id = "recurring" required = "" placeholder = "Y/N">
                </div>

                <div class = "container3">
                    <br><br>
                    <label for = "description">Description: </label>
                    <input type = "text" id = "description" required = "" placeholder = "Any comments?">

                    <br><br>
                    
                    <button id = "savebutton" type = "button" v-on:click = "save_transaction()"> Save </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
//import firebaseApp from '../firebase.js';
//import {getFirestore} from "firebase/firestore";
//import {doc, setDoc} from "firebase/firestore";
//const db = getFirestore(firebaseApp)

export default {
    methods: {
        async save_transaction() {
            
        },
        async inputTransactionType() {

        }
    }
}
</script>

<style>
    .all_transaction_options div{
        display:inline-block;
        width:350px;
    }

    .main_container {
        width:100%;
        margin: 0 auto;
        margin-top:40px;
        height:400px;
        border:1px solid black
    }

    .container1, .container2, .container3 div {
        float:left;
        width:33%;
        height: 250px;
        background-color: white;
        -moz-box-shadow: 0 0 10px #bdbdbd;
    }

    #description {
        height:120px;
        font-size:14pt;
        text-align: center;
    }

    #savebutton {
        width: 330px;
        height: 50px;
        background-color: #87CEFA;
        font-size: 20pt;
    }

    #income_option_button, #expenses_option_button, #owed_payment_option_button {
        width: 200px;
        height: 30px;
        background-color:#FF7F50;
        font-size: 14pt;
    }

    #amount, #transaction_name, #category, #date_input, #date_of_return, #recurring, #description {
        background-color:#FFA07A;
    }
</style>

 