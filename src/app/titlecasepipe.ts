import { Pipe, PipeTransform } from '@angular/core';  
@Pipe({  
    name: 'titlecase'  
})  
export class TitleCasePipe implements PipeTransform {  
    transform(value: string): string { 
        if (!value) return '--';  

        var filteredValue = value.replace(/_/g," ");
        return filteredValue;
    }  
}