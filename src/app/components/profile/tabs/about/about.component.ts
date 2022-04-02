import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileService } from '../../profile.service';

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

    shortBio: string = 'I’m a curious and ambitious web programmer. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips.   I like learning new stuff every day and challenge myself.';
    longBio: string = 'I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips. I love travel all over the world and learn everythings of the different cultures from the people I meet along my trips.';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        @Inject(DOCUMENT) document: Document
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });
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

    toggleSeeAll(element: any): void {

        switch (element) {
            case 'bio':
                this.isSeeAllBio = !this.isSeeAllBio;
                this.isSeeAllSkills = false;
                break;
            case 'skills':
                this.isSeeAllSkills = !this.isSeeAllSkills;
                this.isSeeAllBio = false;
                break;
        }

        document.getElementById('topAboutSection')!.scrollIntoView({ behavior: 'smooth' });

    }

}
