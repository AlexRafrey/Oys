const elems = [
	{
		'start': {
			'style': `background: rgba(92, 188, 135, 0.25);padding: 10px; margin-bottom: 10px;border-radius: 10px;`,
			'elem': `<div ~st~ data-id="0">Если</div>`
		},
		'work':{ 
			'elem': `<div ~st~ data-id="0">Если 
							<select name="" id="">
								<option value="he">Он</option>
								<option value="she">Она</option>
							</select>
							Выполнить
							<select name="" id="">
								<option value="do">Сделать это</option>
								<option value="go">Пойти туда</option>
							</select> 
					</div>`,
		}
	},
	{
		'start': {
			'style': `background: #b2b2f6;padding: 10px; margin-bottom: 10px;border-radius: 10px;`,
			'elem': `<div ~st~ data-id="1">Переменной</div>`
		},
		'work':{ 
			'elem': `<div ~st~ data-id="1">Проиграть файл <select name="" id="">
						<option value="1">One</option>
						<option value="1">Two</option>
					</select></div>`,
		}
	},
	{
		'start': {
			'style': `background:#c7c56e;padding: 10px; margin-bottom: 10px;border-radius: 10px;`,
			'elem': `<div ~st~ data-id="2">Выбора</div>`
		},
		'work':{ 
			'elem': `<div ~st~ data-id="2">A = <input type="text"></div>`,
		}
	},
	
];

 

class DragDrop{ 

	constructor(){
		this.two = document.querySelector('.two-field');
		this.one = document.querySelector('.one-field');

		this.initial(elems);  
		this.getActions(document.querySelectorAll('.two-field>div')); 
	}

	initial(elems) {
		let str = '';
		elems.forEach(elem => {
			let div = elem.start.elem.replace(/~st~/gi, ' style="'+elem.start.style+'" '); 
			str += div;
		});
		this.two.innerHTML = str;
	};

	
	getActions(divs){ 
		let wrap = document.querySelector('.wrap');

		divs.forEach(div => {
			div.addEventListener('mousedown', (e) =>{
				e.target.style.position  = 'absolute';
				let that = e.target;

				wrap.onmousemove  = (e) => { 
					that.style.left = e.pageX - that.offsetWidth / 2 + 'px';
					that.style.top = e.pageY - that.offsetHeight / 2 + 'px';
					this.drag(that.style.left, that.style.top, that);
				}; 
					 
				that.ondragstart = function() {
					return false;
				  }; 

				wrap.onmouseup  = () => {  
					wrap.onmousemove = null;
					that.onmouseup = null;
					if (!this.check(that.style.left, that.style.top, that)) {
						this.back(that);
					}
				} 
			})
		});
	}
	check(divLeft, divTop, div){
		let id = div.getAttribute('data-id'); 
		let one = document.querySelector('.one');
		let par = one.getBoundingClientRect(); 
		if((parseInt(divLeft) >= par.left && parseInt(divLeft) <= par.right)
			&& parseInt(divTop) <= par.bottom && parseInt(divTop) >= par.top
			&& document.querySelector(`.one-field > div[data-id="${id}"]`) == null  ){  
				return true;
		}     
	}

	drag(divLeft, divTop, div){   
		if(this.check(divLeft, divTop, div)){  
			setTimeout(() => {
				this.addElem(div);
			}, 100);
		}     
	} 

	addElem(div){
		let id = div.getAttribute('data-id'); 
		div.remove();
		if (document.querySelector(`div[data-id="${id}"]`) == null) {
			let div = elems[id].work.elem.replace(/~st~/gi, ' style="'+elems[id].start.style+'" ');  
			this.one.innerHTML += div;  
		}
	}

	back(div){ 
		div.style.position = 'static';
	}

};
new DragDrop;