let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    huerotate:{
        value:0,
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
    }
};

const imageCanva = document.querySelector('#image-canvas');
const imageInput = document.querySelector('#image-input');
const canvasCtxc = imageCanva.getContext('2d');
const reset = document.querySelector('#reset-btn');
const download = document.querySelector('#download-btn');
const presetsContainer = document.querySelector('.presets')

let file = null;
let image = null;

const filtersContainer = document.querySelector('.filters');

function createfilter(name,unit="%",value,min,max){
    const div = document.createElement('div');
    div.classList.add('filter');

    const input = document.createElement('input');

    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement('p');
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener('input',(event)=>{
        filters[name].value = Number(event.target.value);
        applyFilters();
    });

    return div;
}
function createFilter(){
   Object.keys(filters).forEach(key=>{
    const filterElement = createfilter(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max
    );

    filtersContainer.appendChild(filterElement);
}); 
} 
createFilter()

imageInput.addEventListener('change',(event)=>{

    file = event.target.files[0];

    const imagePlace = document.querySelector('.placeholder');

    imageCanva.style.display = 'block';
    imagePlace.style.display = "none";

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = ()=>{
        image = img;

        imageCanva.width = img.width;
        imageCanva.height = img.height;

        applyFilters();

        URL.revokeObjectURL(img.src);
    };
});

function applyFilters(){

    if(!image){
        return;
    }

    canvasCtxc.clearRect(
        0,
        0,
        imageCanva.width,
        imageCanva.height
    );

    canvasCtxc.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.huerotate.value}${filters.huerotate.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `.trim();

    canvasCtxc.drawImage(
        image,
        0,
        0,
        imageCanva.width,
        imageCanva.height
    );

    canvasCtxc.filter = 'none';
}

reset.addEventListener('click',()=>{
filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    huerotate:{
        value:0,
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
    }
};
applyFilters()
filtersContainer.innerHTML=''
createFilter()
})

download.addEventListener('click',()=>{
    const link = document.createElement('a')
    link.download = 'image-editor.png'
    link.href=imageCanva.toDataURL()
    link.click()
})

const presets = {
    normal:{
        brightness:100,
        contrast:100,
        saturation:100,
        huerotate:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    drama:{
        brightness:90,
        contrast:150,
        saturation:120,
        huerotate:0,
        blur:0,
        grayscale:10,
        sepia:5,
        opacity:100,
        invert:0
    },

    vintage:{
        brightness:105,
        contrast:90,
        saturation:80,
        huerotate:0,
        blur:0,
        grayscale:5,
        sepia:35,
        opacity:100,
        invert:0
    },

    oldschool:{
        brightness:105,
        contrast:85,
        saturation:65,
        huerotate:0,
        blur:0,
        grayscale:10,
        sepia:55,
        opacity:100,
        invert:0
    },

    cinematic:{
        brightness:90,
        contrast:140,
        saturation:85,
        huerotate:350,
        blur:0,
        grayscale:5,
        sepia:10,
        opacity:100,
        invert:0
    },

    blackAndWhite:{
        brightness:100,
        contrast:120,
        saturation:0,
        huerotate:0,
        blur:0,
        grayscale:100,
        sepia:0,
        opacity:100,
        invert:0
    },

    warm:{
        brightness:105,
        contrast:105,
        saturation:120,
        huerotate:15,
        blur:0,
        grayscale:0,
        sepia:20,
        opacity:100,
        invert:0
    },

    cool:{
        brightness:100,
        contrast:110,
        saturation:90,
        huerotate:200,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    faded:{
        brightness:110,
        contrast:75,
        saturation:65,
        huerotate:0,
        blur:0,
        grayscale:10,
        sepia:15,
        opacity:90,
        invert:0
    },

    moody:{
        brightness:75,
        contrast:155,
        saturation:80,
        huerotate:220,
        blur:0,
        grayscale:15,
        sepia:5,
        opacity:100,
        invert:0
    },

    retro:{
        brightness:105,
        contrast:95,
        saturation:90,
        huerotate:10,
        blur:0,
        grayscale:5,
        sepia:45,
        opacity:100,
        invert:0
    },

    film:{
        brightness:95,
        contrast:130,
        saturation:90,
        huerotate:0,
        blur:0,
        grayscale:20,
        sepia:15,
        opacity:100,
        invert:0
    },

    dreamy:{
        brightness:115,
        contrast:80,
        saturation:110,
        huerotate:350,
        blur:2,
        grayscale:0,
        sepia:10,
        opacity:95,
        invert:0
    },

    dark:{
        brightness:65,
        contrast:135,
        saturation:90,
        huerotate:0,
        blur:0,
        grayscale:10,
        sepia:0,
        opacity:100,
        invert:0
    },

    vivid:{
        brightness:105,
        contrast:120,
        saturation:170,
        huerotate:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    noir:{
        brightness:80,
        contrast:160,
        saturation:0,
        huerotate:0,
        blur:0,
        grayscale:100,
        sepia:10,
        opacity:100,
        invert:0
    }
};


Object.keys(presets).forEach(presetsName =>{
    const presetBtn = document.createElement('button')
    presetBtn.classList.add('btn')
    presetBtn.innerHTML = presetsName
    presetsContainer.appendChild(presetBtn)

    presetBtn.addEventListener('click',()=>{
        const preset = presets[presetsName]
        Object.keys(preset).forEach(filterName =>{
          filters[filterName].value= preset[filterName]
        })
        applyFilters()
        filtersContainer.innerHTML=""
        createFilter()
    })
})