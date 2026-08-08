const filters = {
    brightness:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    exposers:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    huerotate: {
        value:100,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:100,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
}

const filtersContainer=document.querySelector('.filters')

function createfilter(name,unit="%", value,min,max){
   const div= document.createElement('div')
   div.classList.add('filter')
   const input=document.createElement('input')
   input.type='range'
   input.min=min
   input.max=max
   input.value=value
   //input.unit=unit
   input.id=name

   const p= document.createElement('p')
   p.innerText=name

   div.appendChild(p)
   div.appendChild(input)
}

Object.keys(filters).forEach(key=>{
  const filterElement = createfilter( key, filters[key].unit,filters[key].value,filters[key].min,filters[key].max)
  filtersContainer.appendChild(filterElement)
})