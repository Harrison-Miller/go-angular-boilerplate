import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../api/services/project-service.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?: string[];

  constructor(private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.projectService.ProjectServiceListProjects().subscribe(
      resp => { this.projects = resp.projectNames!; }
    );
  }

}
