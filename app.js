let chart = document.querySelector('.spendings');
let days = document.querySelectorAll('.day');
let dayName = document.querySelector('.day-name');
let showAmount = document.querySelector('.amount');

let precentige = (spending) => {
  let precentige = spending / 65;
  return (number = precentige.toFixed(2));
};
let amounts = [];
let el = '';
fetch('data.json')
  .then((response) => response.json())
  .then((json) => {
    json.forEach((item) => {
      amounts.push(item.amount);
      el += `<div>${item.day}</div>`;
    });
    let highNumber = Math.max(...amounts);
    days.forEach((day, idx) => {
      if (highNumber === json[idx].amount) {
        let amount = precentige(json[idx].amount);

        day.style.transform = `scaleY(${amount})`;
        day.classList.add('blue');
      } else {
        let amount = precentige(json[idx].amount);

        day.style.transform = `scaleY(${amount})`;
      }
      days.forEach((day, idx) => {
        day.addEventListener('mouseover', (e) => {
          let el = e.srcElement;
          el.style.opacity = '0.5';
          let elRct = el.getBoundingClientRect();

          let elWidth = elRct.right - elRct.left;
          elWidth += 10;
          // elShowAmount.x = elRct.x;
          showAmount.innerText = '$' + json[idx].amount;
          showAmount.style.width = '' + elWidth + 'px';
          showAmount.style.left = '' + (elRct.left - 5) + 'px';
          showAmount.style.top = '' + (elRct.top - 55) + 'px';
          setTimeout(() => {
            showAmount.classList.add('show-amount');
          }, 300);
        });
      });
    });

    dayName.innerHTML = el;
  });

// window.onload = function () {
//   days.forEach((day) => {
//     day.classList.add('show');
//   });
// };

days.forEach((day) => {
  day.addEventListener('mouseleave', (e) => {
    showAmount.classList.remove('show-amount');
    el = e.srcElement;
    el.style.opacity = '1';
  });
});
