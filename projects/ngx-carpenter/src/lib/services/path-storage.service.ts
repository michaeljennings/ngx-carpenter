import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { filters } from '../helpers/array';
import { SessionStorageService } from './session-storage.service';
import { SESSION_STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PathStorageService {
    /**
     * Previous section reference.
     */
    protected previousSection: string;

    /**
     * Gets the current section.
     */
    get currentSection (): string {
        const url = this.router.url;
        const section = this.sectionFromUrl(url);
        this.previousSection = section;
        return section;
    }

    /**
     * Initiates the class.
     */
    constructor (
        private sessionStorage: SessionStorageService,
        private router: Router,
    ) {
        router.events
              .pipe(filter(event => event instanceof NavigationEnd))
              .subscribe(() => {
                  const prev = this.previousSection;
                  const next = this.sectionFromUrl(this.router.url);
                  this.clean(prev, next);
              });
    }

    /**
     * Gets the current section from the given URL.
     */
    private sectionFromUrl (url: string): string {
        const regex = /^(\/?[^\/#?]+)/;
        return (regex.exec(url) || ['/'])[0];
    }

    /**
     * Gets all the keys belonging to the given section.
     */
    private getSection (section: string): string[] {
        return this.sessionStorage.has(section)
            ? this.sessionStorage.get(section)
            : [];
    }

    /**
     * Stores the given keys against the given section.
     */
    private setSection (section: string, stored: string[]): boolean {
        return this.sessionStorage.set(
            section,
            stored.filter(filters.unique),
        );
    }

    /**
     * Cleans up the path storage keys. Removes
     * any data relating to any section that is not
     * the current section.
     */
    private clean (prev: string|null, next: string) {
        if (prev && prev !== next) {
            const sectionKey = this.sectionKey(prev);
            const keys = this.getSection(sectionKey).map(this.key);

            this.sessionStorage.removeMany(sectionKey, ...keys);
        }
    }

    /**
     * Prefixes the given key with the prefix in
     * the constants file.
     */
    private key (key: string): string {
        if (key.startsWith(SESSION_STORAGE_KEYS.PATH_STORAGE.PREFIX)) {
            throw new Error('The key is already prefixed!');
        }

        return SESSION_STORAGE_KEYS.PATH_STORAGE.PREFIX + key;
    }

    /**
     * Gets the key to use for the current section.
     */
    private sectionKey (section: string): string {
        return `${SESSION_STORAGE_KEYS.PATH_STORAGE.SECTION_PREFIX}(${section})`;
    }

    /**
     * Adds the given key to the current section.
     */
    private addKeyToCurrentSection (key: string) {
        const sectionKey = this.sectionKey(this.currentSection);
        const stored = this.getSection(sectionKey);

        this.setSection(sectionKey, [...stored, key]);
    }

    /**
     * Takes a key and a value, and saves it into local storage
     * as prefix__key == value.
     */
    public set (key: string, value: string|object|number): boolean {
        const saved = this.sessionStorage.set(this.key(key), value);

        if (saved) {
            this.addKeyToCurrentSection(key);
        }

        return saved;
    }

    /**
     * Gets the given key out of storage.
     */
    public get <T = string|object|number|null> (key: string): T {
        return this.has(key)
            ? this.sessionStorage.get(this.key(key))
            : null;
    }

    /**
     * Determines if a given key exists in storage.
     */
    public has (key: string): boolean {
        return this.sessionStorage.has(this.key(key));
    }
}
