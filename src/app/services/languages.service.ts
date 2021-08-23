import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import langs from '../../assets/i18n/langs.json';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {

  currentLang!: string;
  langs: Langs = langs;

  constructor(
    public translate: TranslateService,
    private cs: ConstantsService) {
  }

  /* Initialization of language */
  initLang(): string {
    const defaultLang = this.langs.default;

    this.translate.addLangs(langs.langs);
    this.translate.setDefaultLang(defaultLang);
    const lng = localStorage.getItem(this.cs.localStorageLang);
    this.currentLang = lng != null ? lng : defaultLang;
    this.translate.use(this.currentLang);
    return this.currentLang;
  }

  /* Method used to switch from one language to another */
  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem(this.cs.localStorageLang, lang);
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
