// const age = 100;

// function go() {
//   const hair = 'blonde';
// }
// console.log(age);
// console.log(hair);
// // console.log('test');

// const Formatter = (function() {
//     const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  
//     const makeUppercase = (text) => {
//       log("Making uppercase");
//       return text.toUpperCase();
//     };  
  
//     return {
//       makeUppercase,
//     }
//   })();


// const Formatter = (function() {
//     let timesRun = 0;
  
//     const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
//     const setTimesRun = () => { 
//       log("Setting times run");
//       ++timesRun;
//     }
  
//     const makeUppercase = (text) => {
//       log("Making uppercase");
//       setTimesRun();
//       return text.toUpperCase();
//     };
  
//     return {
//       makeUppercase,
//       timesRun,
//     }
//   })();

// //   Formatter.log("Hello");
// // console.log(Formatter.makeUppercase("tomek"));
// console.log(Formatter.makeUppercase("tomek"));
// console.log(Formatter.timesRun);

// Formatter.timesRun = 10;
// console.log(Formatter.timesRun);

// const Formatter = (function() {
//     const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
//     const timesRun = [];
  
//     const makeUppercase = (text) => {
//       log("Making uppercase");
//       timesRun.push(null);
//       return text.toUpperCase();
//     };
  
//     return {
//       makeUppercase,
//       timesRun,
//     }
//   })();
  
//   console.log(Formatter.makeUppercase("tomek"));
//   console.log(Formatter.makeUppercase("tomek"));
//   console.log(Formatter.makeUppercase("tomek"));
//   console.log(Formatter.timesRun.length);


const Formatter = (function() {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  
    const makeUppercase = (text) => {
      log("Making uppercase");
      return text.toUpperCase();
    };
  
    const writeToDOM = (selector, message) => {
      document.querySelector(selector).innerHTML = message;
    }
  
    return {
      makeUppercase,
      writeToDOM,
    }
  })();
  
  Formatter.writeToDOM("#target", "Hi there");