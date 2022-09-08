const gradients = document.querySelectorAll('.gradient-wrapper');
const inputs = document.querySelectorAll('input');

let param = [
    ['name','Jane Appleseed'],
    ['number','0000 0000 0000 0000'],
    ['month','00'],
    ['year','00'],
    ['cvc','000'],
];

let is_valid = new Map([['name',false],['number',false],['month',false],['year',false],['cvc',false]]);

const default_values = new Map(param);

const setErrors = (input,error_div,error_msg) => {
    is_valid.set(input.name,false)
    input.classList.add('invalid-input');
    unsetBackground(input);
    error_div.innerHTML = error_msg;
}

const checkFormat = (input,error_div) => {
    let is_error = false

    if (input.name === 'name'){
        if(!/^[a-zA-Z\s]+$/g.test(input.value)){
            let error_msg = 'Wrong format, letters only.';
            setErrors(input,error_div,error_msg);
            is_error = true;
        }
    }

    else{
        if(input.name==='month' && Number(input.value)>=13){
            error_msg = 'Max value is 12.';
            setErrors(input,error_div,error_msg);
            is_error = true;
        }

        if(input.name==='number'){
            is_error = !/^\d{4}\s\d{4}\s\d{4}\s\d{4}/g.test(input.value);

            if(!/^\d{4}\s\d{4}\s\d{4}\s\d{4}/g.test(input.value) && input.value.length===19){
                error_msg = 'Wrong format.';
                setErrors(input,error_div,error_msg);
                is_error = true;
            }
        }

        if(input.name==='cvc' && input.value.length<3){
            error_msg = 'Cvc has to be 3 digits.';
            setErrors(input,error_div,error_msg);
            is_error = true;
        }

        if(!/^[0-9\s]+$/g.test(input.value)){
            let error_msg = 'Wrong format, numbers only.';
            setErrors(input,error_div,error_msg);
            is_error = true;
        }
    }

    return is_error
}

const Validate = (param) => {
    let error_msg;
    let input = param.target;
    let value = default_values.get(input.name);
    let error_div = document.querySelector(`.${input.name}-errors`);

    if(input.value===''){
        error_msg = "Can't be blank.";
        setErrors(input,error_div,error_msg);
        
    } else{
        error_div.innerHTML = '';
        
        // checking format for input.
        let valid = checkFormat(input,error_div);
        
        if(!valid){
            input.classList.remove('invalid-input');
            is_valid.set(input.name,true);
        }
        
        value = input.value;
    }
    
    let card = document.querySelector(`#${input.name}`);
    card.innerHTML = value;
}

const confirm = () => {
    let all_valid = true;

    for(let i of is_valid.values()){
        if(i===false){
            all_valid = false;
            break;
        };
    };

    if (all_valid){
        let confirmation = document.getElementsByClassName('confirmation')[0];
        let form_wrapper = document.getElementById('form-wrapper');
        form_wrapper.style.display = 'none';
        confirmation.style.display = 'flex';
    };
}

const unsetBackground = (input) => {
    let parentGradient = input.parentElement;
    parentGradient.style = 'background-image: none;';
}

for(let i of inputs){
    i.addEventListener('focusout',Validate);
    i.addEventListener('input',Validate);
};
