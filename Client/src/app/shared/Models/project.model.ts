export class Project {
    name: string;
    startDate: string;
    endDate: string;
    duration: string;
    type: TypeP;
}

export enum TypeP {
    Web = 'web',
    Mobile= 'mobile',
    both='both'
}