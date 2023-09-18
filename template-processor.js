'use strict';


class TemplateProcessor {

    constructor(template)
    {
        this.template = template;
    }
    fillIn(variable){
        const entries = Object.entries(variable);
        for(const [key,value] of entries){
            const lookup =  `{{${key}}}`;
            if (this.template.includes(lookup)) {
                this.template = this.template.replace(lookup, value);
            }
        }
        return this.template;
    }
}




