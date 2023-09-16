let template;

class TemplateProcessor {
    constructor(template)
    {
        this.template = template
    }
    fillIn(variable){
        let entries = Object.entries(variable)
        for(let i = 0;i<entries.keys();i++){
            let lookup =  `{{${entries.key[i]}}}`
            if (template.includes(lookup)) {
                template = template.replace(lookup, variable.value[i])
            }
        }
        return template
    }
}


template = `My favorite month is {{month}} but not the day {{day}} or the year {{year}}`;
let dateTemplate = new TemplateProcessor(template);

let dictionary = {month: 'July', day: '1', year: '2016'};
for(let i = 0;i<dictionary.length;i++){
    console.log(dictionary)
}
let print_str = dateTemplate.fillIn(dictionary);
console.log(print_str)