

// arrows.forEach((arrow,i)=>{
//     console.log(arrow);
// })
 

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".navbar,.sidebar,.cont,.toggle,.menu,.left-menu-icon");

ball.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.toggle("active");
    });
    ball.classList.toggle("active");
  });