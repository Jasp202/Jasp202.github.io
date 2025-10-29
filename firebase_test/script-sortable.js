/*
 Features:
  - createItem(text)
  - drag & drop reorder using HTML5 drag events
  - inline edit via contenteditable
  - Up / Down buttons for keyboard accessibility
*/

const list = document.getElementById('itemList');
const addBtn = document.getElementById('addBtn');
const newItemInput = document.getElementById('newItem');
const addSample = document.getElementById('addSample');


function createItem(object_data){
  const li = document.createElement('li');
  li.className = 'item';
  if(object_data.platform == "spotify"){
    li.classList.add("spotify")
  }
  li.dataset.order = object_data.order;

  // left grab handle
  const grab = document.createElement('div');
  grab.className = 'grab';
  if(object_data.platform == "youtube"){
    grab.innerHTML = '<i class="fa-brands fa-youtube"></i>';
  } else {
    grab.innerHTML ='<i class="fa-brands fa-spotify"></i>';
    grab.classList.add("spotify");
  }
  grab.title = 'Drag to reorder';
  grab.setAttribute('aria-hidden', 'true');

  // content (editable)
  const content = document.createElement('div');
  content.className = 'content';
  content.spellcheck = false;
  content.textContent = object_data.name;
  content.setAttribute('role', 'textbox');
  content.setAttribute('aria-label', 'Item text (editable)');

  // actions (horizontal)
  const actions = document.createElement('div');
  actions.className = 'actions';

  const upTwiceBtn = document.createElement('button');
  upTwiceBtn.className = 'small';
  upTwiceBtn.textContent = 'Top';
  upTwiceBtn.title = 'Top up';
  upTwiceBtn.addEventListener('click', ()=> {
    swapWithSecondSmallest(Number(li.dataset.order))
    content.focus();
  });


  const upBtn = document.createElement('button');
  upBtn.className = 'small';
  upBtn.textContent = 'Up';
  upBtn.title = 'Up up';
  upBtn.addEventListener('click', ()=> {
    const prev = li.previousElementSibling;
    if(prev) {
        //list.insertBefore(li, prev);
        swapOrder(
        Number(li.dataset.order),
        Number(prev.dataset.order)
        )
    }
    content.focus();
  });

  const downBtn = document.createElement('button');
  downBtn.className = 'small';
  downBtn.textContent = 'Down';
  downBtn.title = 'Move down';
  downBtn.addEventListener('click', ()=> {
    const next = li.nextElementSibling;
    if(next) {
        //list.insertBefore(next, li);
        swapOrder(
        Number(li.dataset.order),
        Number(next.dataset.order)
        )
    }
    content.focus();
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'small';
  delBtn.textContent = 'Delete';
  delBtn.title = 'Delete this item';
  delBtn.addEventListener('click', ()=> {
    deleteByOrder(Number(li.dataset.order))
  });
  delBtn.style.marginLeft = "1rem"
  actions.append(upTwiceBtn, upBtn, downBtn, delBtn);

  li.append(grab, content, actions);

  
  return li;
}

function addMany(added_list) {
    $(list).empty();
    added_list.forEach(t => list.appendChild(createItem(t)));
}
addBtn.addEventListener('click', () => {
  const text = newItemInput.value.trim();
  if(!text) return;
  list.appendChild(createItem(text));
  newItemInput.value = '';
  newItemInput.focus();
});

addSample.addEventListener('click', () => {
  const sample = 'Sample ' + (list.children.length + 1);
  list.appendChild(createItem(sample));
});

