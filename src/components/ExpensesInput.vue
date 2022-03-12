<template>
<div class = "container">
        <form id = "myform">
            <h2>Adding Transactions</h2>

            <div class = "expenses_form">

                <div class = "all_transaction_options">
                    <div><button id = "income_option_button" type = "button" v-on:click = "inputTransactionType(1)"> Income </button></div>
                    <div><button id = "expenses_option_button" type = "button" v-on:click = "inputTransactionType(2)"> Expenses </button></div>
                    <div><button id = "owed_payment_option_button" type = "button" v-on:click = "inputTransactionType(3)"> Owed Payments </button></div>
                </div>

                <br><br>

                <label for = "amount">Amount: </label>
                <input type = "number" id = "amount" required = "" placeholder = "Enter Amount"> <br><br>

                <label for = "transaction_name">Transaction Name: </label>
                <input type = "text" id = "transaction_name" required = "" placeholder = "Enter Name of Transaction"> <br><br>

                <label for = "category">Category: </label>
                <input type = "text" id = "category" required = "" placeholder = "Enter Category"> <br><br>

                <label for = "date_input">Date of Expense: </label>
                <input type = "date" id = "date_input" required = "" placeholder = "Enter Date"> <br><br>

                <label for = "date_of_return">Date of Return: </label>
                <input type = "date" id = "date_of_return" required = "" placeholder = "Enter Date of Return"> <br><br>

                <label for = "recurring">Recurring?: </label>
                <input type = "text" id = "recurring" required = "" placeholder = "Y/N"> <br><br>

                <label for = "description">Description: </label>
                <input type = "text" id = "description" required = "" placeholder = "Any comments?"> <br><br>

                <div class = "save">
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
        width:150px;
    }
</style>