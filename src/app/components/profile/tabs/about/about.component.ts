import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileService } from '../../profile.service';

/* Constants */
const container: string = 'topAboutSection';
const bioCard: string = 'bioCard';
const bioClass: string = 'showAllBio';
const skillsCard: string = 'skillsCard';
const skillsClass: string = 'showAllSkills';
const bioReplace: string = 'bioReplace';
const skillsReplace: string = 'skillsReplace';


@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    about: any;

    isSeeAllBio: boolean = false;
    isSeeAllSkills: boolean = false;

    container: HTMLElement | null = null;
    bioCard: HTMLElement | null = null;
    skillsCard: HTMLElement | null = null;

    shortBio: string = 'I’m a curious and ambitious web programmer. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips.   I like learning new stuff every day and challenge myself.';
    longBio: string = 'I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips.';

    isContainer: boolean = true;

    allSkills: any[] = ['Java', 'Angular', 'Web Marketing', 'Google Analytics', 'Html', 'CSS', 'GIT', 'PHP', 'Wordpress', 'Javascript'];
    third = Math.ceil(this.allSkills.length / 3);  
    fewSkills = this.allSkills.slice(0,3);
    firstThird: any[] = [];
    secondThird: any[] = [];
    thirdThird: any[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        @Inject(DOCUMENT) document: Document
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();        
    }

    ngOnInit(): void {
        /** Declarations */
        this.container = document.getElementById(container);
        this.bioCard = document.getElementById(bioCard);
        this.skillsCard = document.getElementById(skillsCard);

        /** Observer */
        const bioObserver = this.createResizeObserver(this.bioCard, bioClass, this.bioCard!, false, bioReplace);
        const skillsObserver = this.createResizeObserver(this.skillsCard, skillsClass, this.skillsCard!, true, skillsReplace);
        this._unsubscribeAll.next(bioObserver);
        this._unsubscribeAll.next(skillsObserver);

        /** Subscriptions */
        bioObserver.observe(this.container!);
        skillsObserver.observe(this.container!);

        if(window.innerWidth < 600) {
            this.isContainer = false;
        } else {
            this.isContainer = true;
        }

        if(this.allSkills && this.allSkills.length>0) {
            const first = Math.ceil(this.allSkills.length / 3);
            this.firstThird = this.allSkills.slice(0,first);
            const second = Math.ceil((this.allSkills.length - this.firstThird.length) / 2);
            this.secondThird = this.allSkills.slice(first, this.firstThird.length + second);
            this.thirdThird = this.allSkills.slice(this.firstThird.length + second,this.allSkills.length);
        }
    }
    

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**If small screen reset sections */
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if(window.innerWidth < 600) {
            this.isContainer = false;
            this.isSeeAllSkills = false;
            this.isSeeAllBio = false;
            this.resetSection(this.bioCard, bioClass, false);
            this.resetSection(this.skillsCard, skillsClass, true);
        } else {
            this.isContainer = true;
        }
    }

    /**Functions triggered by expand buttons. 
     * It toggles the expanded version of the relative section */
    toggleSeeAll(element: any): void {

        switch (element) {
            case 'bio':
                this.isSeeAllBio = !this.isSeeAllBio;
                this.isSeeAllSkills = false;
                this.toggle(this.bioCard, bioClass, bioReplace, false);
                this.resetSection(this.skillsCard, skillsClass, true);
                break;
            case 'skills':
                this.isSeeAllSkills = !this.isSeeAllSkills;
                this.isSeeAllBio = false;
                this.toggle(this.skillsCard, skillsClass, skillsReplace, true);
                this.resetSection(this.bioCard, bioClass, false);
                break;
        }

        this.container!.scrollIntoView({ behavior: 'smooth' });
        
    }

    /**Toggles the expanded version of a specific section */
    toggle(card: HTMLElement | null, className: string, replaceClassName: string, isRight: boolean): void {
        if(window.innerWidth >= 600) {
            if(card!.classList.contains(className)){
                this.resetSection(card, className, isRight);
            } else{
                this.expandSection(card, className, isRight);
            }
            this.activeReplacement(card, replaceClassName);
        }
    }

    /**Observer used to resize expanded sections if screen sizes changes */
    createResizeObserver(card: HTMLElement | null, className: string, element: HTMLElement, isRight: boolean, replaceClassName: string): ResizeObserver {
        return new ResizeObserver(entries => {
            if(window.innerWidth >= 600) {
                if(element.classList.contains(className)) {
                    this.expandSection(card, className, isRight);
                } else {
                    this.resetSection(card, className, isRight);
                }

                this.activeReplacement(element, replaceClassName);
            }

        });
    }

    /**It resetes a specific section to its original dimensions and position */
    resetSection(card: HTMLElement | null, className: string, isRight: boolean){
        card!.style.width = 'auto';
        card!.style.position = 'relative';
        card!.classList.remove(className);
        if(isRight){
            this.skillsCard!.style.left = 'auto';
        }
    }

    /**It expands a specific section*/
    expandSection(card: HTMLElement | null, className: string, isRight: boolean){
        card!.style.width = (this.container!.clientWidth) + 'px';
        card!.style.position = 'absolute';           
        card!.classList.add(className);
        if(isRight){
            this.skillsCard!.style.left = 0 + 'px';
        }
    }

    /**It gives dimensione to the replacement divs used to replace the size of the expanded sections absolute */
    activeReplacement(card: HTMLElement | null, replaceClassName: string){
        setTimeout(() => {            
            const elements = Array.from(document.getElementsByClassName(replaceClassName) as HTMLCollectionOf<HTMLElement>);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.height= card!.clientHeight + 'px';
                elements[i].style.width= card!.clientWidth + 'px';
            }
        }, 1);
    }
}
