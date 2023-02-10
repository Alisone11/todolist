let data = [];
let dataStatus = 'all'
const cardList = document.querySelector('.card_list')
const list = document.querySelector('.list');
const listItem = document.querySelector('.list li')
const listFooter = document.querySelector('.list_footer')
const text = document.querySelector('input[type="text"]');
const btn_add = document.querySelector('.btn_add');
const tab = document.querySelector('.tab');
const tabs = tab.querySelectorAll('li');

function render(data) {
  let str ='';
  data.forEach((item, index) => { str += 
    `<li data-num="${item.id}">
      <label class="checkbox" for="">
        <input type="checkbox" ${item.check}/>
        <span>${ item.content }</span>     
      </label>
      <a href="#" class="delete"></a>
    </li>`
  });
  list.innerHTML = str; 
  let count = 0;
  data.forEach(item => {
    if(item.check === '')
    count += 1;
  })
  listFooter.innerHTML = ` <p>${ count } 個待完成項目</p>
  <a href="#">清除已完成項目</a>`
  text.value = ''
}

function checkTabData(){
  let showData= []
  tabs.forEach(item => {
    if(item.getAttribute('class') === 'active'){
      if(item.innerText === '全部'){
        showData = data;
      } else if(item.innerText === '待完成'){
        showData = data.filter(item => item.check === '')
      } else if(item.innerText === '已完成'){
        showData = data.filter(item => item.check === 'checked')
      }     
    }
  })
  render(showData);
}

function add(e) {
  e.preventDefault();
  if(text.value.trim() === ''){
    alert('請輸入待辦事項！');
    return
  }
  if(data.length === 0){
    cardList.style.display = "block";
    tab.querySelector('li').classList.add('active')
  }
  let item = {};
  item.content = text.value;
  item.id = new Date().getTime();
  item.check = '';
  data.push(item);
  console.log(item)
  checkTabData()
}

function handleItem(e) {
  let num = parseInt(e.target.closest("li").dataset.num);
  if(e.target.classList.contains('delete')){
    e.preventDefault();
    let id = data.findIndex((item) => item.id === num);
    data.splice(id, 1);
  } else{
    data.forEach((item) => {
      if(item.id === num){
        if(item.check === 'checked'){
          item.check = ''
        } else {
          item.check = 'checked';
        }
      }
    })
  }
    checkTabData()
  }

function switchTab(e) { 
  tabs.forEach(item => {
    if(item.getAttribute('class')==='active'){
      item.classList.remove('active')
    }
  });
  e.target.classList.add('active');
  checkTabData()
}

function deleteChecked(e){
  if(e.target.nodeName !== 'A') return
  e.preventDefault();
  data = data.filter(item => {
    return item.check === '';
  })
  checkTabData()
}

btn_add.addEventListener('click', add);
list.addEventListener('click', handleItem);
tab.addEventListener('click', switchTab);
listFooter.addEventListener('click', deleteChecked);