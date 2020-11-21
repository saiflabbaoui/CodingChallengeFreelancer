import { ProjectService } from '../services/projcet.services';
import { Project } from './project.model';

export class Freelancer {
    name: string;
    email: string;
    phoneNumber: number;
    address: string;
    website: string;
    project?:Project[]
}
export class FreelancerProject {
    freelancerId: number;
    projectId: number;
}