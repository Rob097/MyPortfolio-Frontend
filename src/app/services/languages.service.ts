import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import langs from '../../assets/i18n/langs.json';
import { Constants } from '../../assets/global-constants';

/* Service used to manage the internationalization part of the application */
@Injectable({
  providedIn: 'root',
})
export class LanguagesService {

  public currentLang$: Subject<string> = new Subject();
  currentLang!: string;
  langs: Langs = langs;

  constructor(
    public translate: TranslateService) {
  }

  /* Initialization of language */
  initLang(): string{
    const defaultLang = this.langs.default;

    this.translate.addLangs(langs.langs);
    this.translate.setDefaultLang(defaultLang);

    const lng = localStorage.getItem(Constants.localStorageLang);
    const currentLang = lng != null ? lng : defaultLang;

    this.currentLang$.next(currentLang);
    this.translate.use(currentLang);
    return currentLang;
  }

  /* Method used to switch from one language to another */
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(Constants.localStorageLang, lang);
    this.currentLang$.next(lang);
  }

  getLangs(): string[]{
    return this.translate.getLangs();
  }

}


/* Interface used to map the .json file in /assets/i18n/ */
interface Langs {
  langs: string[];
  default: string;
}
