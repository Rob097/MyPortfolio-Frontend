import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ProfileFakeDb } from './profile';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {


            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,


        };
    }
}
