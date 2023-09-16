let template;

class TemplateProcessor {
    constructor(template)
    {
        this.template = template
    }
    fillIn(variable){
        let entries = Object.entries(variable)
        for(const [key,value] of entries){
            let lookup =  `{{${key}}}`
            if (template.includes(lookup)) {
                template = template.replace(lookup, value)
            }
        }
        return template
    }
}


