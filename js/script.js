// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const pessoaRef = ref(database, 'Pessoas');
let data;

if(document.getElementById("measurement")){
  onValue(pessoaRef, (snapshot) => {
    data = snapshot.val();
  });
  
  const login = document.querySelector('.login');
  login.addEventListener('submit', (e) => {
    e.preventDefault();
    for(let i = 1; i <= 10; i++){
      const pessoa = data['Pessoa' + i].CPF;
      if(pessoa == login.cpfInput.value){
        localStorage.setItem("cpf", data['Pessoa' + i].CPF);
        window.location.href = "valores.html";
      }
    }	 
  });
}

if(document.getElementById("resultadoCorpoTabela")){
  let cpf = Number(localStorage.getItem("cpf"));
  let bpm;
  let oxi; 
  console.log(cpf);

  onValue(pessoaRef, (snapshot) => {
    data = snapshot.val();
    console.log(data);
    for(let i = 1; i <= 10; i++){
      console.log(data['Pessoa' + i].CPF);
      if(data['Pessoa' + i].CPF == cpf){
        document.getElementById('cpf').innerHTML = data['Pessoa' + i].CPF;
        document.getElementById('bpm').innerHTML = data['Pessoa' + i].BPM;
        document.getElementById('oxi').innerHTML = data['Pessoa' + i].OXI;
      }
    }	 
  });
}

