import dayjs from "/ast-change/node_modules/dayjs/esm/index.js";
function clock() {
  setTimeout(() => {
    document.querySelector("#app").innerText = dayjs().format("YYYY-MM-DD HH:mm:ss");
    clock();
  }, 1000);
}
clock();