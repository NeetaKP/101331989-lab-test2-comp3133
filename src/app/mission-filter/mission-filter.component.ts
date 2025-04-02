

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpaceXService } from '../spacex-api.service';
import { Launch } from '../launch.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mission-filter.component.html',
  styleUrls: ['./mission-filter.component.css']
})


export class MissionfilterComponent implements OnInit {
  missions: Launch[] = [];
  filteredMissions: Launch[] = [];
  years: number[] = [];
  isYearFilterActive: boolean = false;
  isSuccessFilterActive: boolean | null = null;
  selectedYear: number | null = null;

  constructor(private spacexService: SpaceXService, private router: Router) {}

  ngOnInit(): void {
    this.spacexService.getLaunches().subscribe(data => {
      this.missions = this.filteredMissions = data;
      this.years = this.extractUniqueYears(data);
    });
  }

  extractUniqueYears(data: Launch[]): number[] {
    return Array.from(new Set(data.map(mission => Number(mission.launch_year)))).sort((a, b) => a - b);
  }

  filterMissionsBySuccess(successful: boolean | null): void {
    this.isSuccessFilterActive = successful;
  
    if (successful === null) {
     
      if (!this.isYearFilterActive) {
       
        this.filteredMissions = this.missions;
      } else {
        
        this.filteredMissions = this.filterMissionsByYearOrSuccess();
      }
    } else {
      if (this.isYearFilterActive) {
        
        this.filteredMissions = this.filterMissionsByYearOrSuccess(successful);
      } else {
       
        this.filteredMissions = this.missions.filter(mission => mission.launch_success === successful);
      }
    }
  }
  
  
  filterMissionsByYearOrSuccess(successful?: boolean | null): Launch[] {
    let filtered: Launch[] = this.missions;
  
   
    if (this.selectedYear !== null) {
      filtered = filtered.filter(mission => Number(mission.launch_year) === this.selectedYear);
    }
  
    
    if (successful !== undefined && successful !== null) {
      filtered = filtered.filter(mission => mission.launch_success === successful);
    }
  
    return filtered;
  }
  
  
  
  
  filterMissionsByYear(year: number): void {
    this.selectedYear = year;
    this.isYearFilterActive = true;
    this.isSuccessFilterActive = null; 
    
    
    if (this.isYearFilterActive) {
  
      if (this.isSuccessFilterActive === null) {
   
        this.filteredMissions = this.missions.filter(mission => Number(mission.launch_year) === year);
      } else {
        this.filteredMissions = this.missions.filter(mission => 
          Number(mission.launch_year) === year && mission.launch_success === this.isSuccessFilterActive
        );
      }
    } else {
      this.filteredMissions = this.missions;
    }
  }
  
  

  navigateToMissionDetails(flightNumber: number): void {
    this.router.navigate(['/missions', flightNumber]);
  }

  navigateToMissionList(): void {
    this.router.navigate(['/missions']);
  }
}
