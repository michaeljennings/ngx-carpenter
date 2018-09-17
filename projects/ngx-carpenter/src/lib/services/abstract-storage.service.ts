import { keyExists, has } from '../helpers/objects';

export abstract class AbstractStorageService {
    /**
     * Cached version of the drivers values. Should only ever contain
     * the parsed values from storage. Nothing in this object should
     * be serialized by this class. In theory, this object will be
     * perfectly in sync with the driver.
     */
    private cache: { [key: string]: string|object|number|null } = {};

    /**
     * Initiates the class, setting the driver to use.
     */
    constructor (protected driver: Storage) {
        // Loop through every entry in the driver
        Object.keys(driver).forEach((key) => {
            this.cache[key] = JSON.parse(driver[key]);
        });
    }

    /**
     * Stores an item in storage.
     */
    public set (key: string, value: string|object|number): boolean {
        try {
            // Add the value to the cache
            this.cache[key] = value;

            // Stringify the value
            value = JSON.stringify(value);
            // Add it to the driver
            this.driver.setItem(key, value);
        } catch (e) {
            // Show an error message and return
            console.error('An error occurred setting an item in storage', e);
            return false;
        }

        return true;
    }

    /**
     * Stores multiple items in storage.
     */
    public setMany (...items: Array<[string, string|object|number]>): boolean[] {
        // Loop through each key/value pair, passing them to the set() method.
        // Return the array of results of the set() method calls.
        return items.map(([key, value]) => this.set(key, value));
    }

    /**
     * Retrieves an item from storage.
     */
    public get<T = string|object|number|null> (key: string): T {
        // Get the key from cache
        const cached = this.cache[key];
        // Determine what to return - no need to
        // access the driver if we have the item in
        // cache, avoid retrieving/parsing the data.
        const val = cached !== undefined
            ? cached
            : JSON.parse(this.driver.getItem(key));

        // Add the value back into the cache.
        // Won't have any effect if we retrieved from the cache,
        // but means we wont have to parse it again next time.
        this.cache[key] = val;

        return val;
    }

    /**
     * Retrieves multiple items from storage.
     */
    public getMany (...givenKeys: string[]): any[];
    public getMany (givenKeys: string[]): any[];
    public getMany (givenKeys: any): any[] {
        // Get the array of keys to retrieve. Could be
        // multiple string arguments, or an array of strings
        const keys: string[] = Array.isArray(arguments[0]) ? givenKeys : Array.from(arguments);

        // Map the keys into the retreived values
        return keys.map(key => this.get(key));
    }

    /**
     * Checks if a given item exists in session storage.
     */
    public has (key: string): boolean {
        // Create function that checks that a
        // given object contains the key.
        const hasKey = keyExists(key);

        // Check that either the cache or
        // the driver contains the key.
        return hasKey(this.cache)
            || hasKey(this.driver);
    }

    /**
     * Checks if all of the given keys exist in storage.
     */
    public hasMany (...givenKeys: string[]): boolean;
    public hasMany (givenKeys: string[]): boolean;
    public hasMany (givenKeys: any): boolean {
        // Get the array of keys to check for existence. Could be
        // multiple string arguments, or an array of strings
        const keys: string[] = Array.isArray(arguments[0]) ? givenKeys : Array.from(arguments);

        // Loop through each key
        for (const key of keys) {
            // If the current key fails a has check, return false
            if (!this.has(key)) { return false; }
        }

        return true;
    }

    /**
     * Removes an item from storage.
     */
    public remove (key: string): void {
        // Remove the key from the cache
        delete this.cache[key];
        // Remove the key from the driver
        this.driver.removeItem(key);
    }

    /**
     * Removes an array of keys from storage.
     */
    public removeMany (...givenKeys: string[]): void;
    public removeMany (givenKeys: string[]): void;
    public removeMany (givenKeys: any): void {
        // Get the array of keys to remove. Could be
        // multiple string arguments, or an array of strings
        const keys: string[] = Array.isArray(arguments[0]) ? givenKeys : Array.from(arguments);

        // Loop through each key, and remove it
        keys.forEach(key => this.remove(key));
    }

    /**
     * Returns and removes an item from storage.
     */
    public pluck (key: string): any {
        // Get the value
        const value = this.get(key);
        // Remove the value
        this.remove(key);
        // Return the value;
        return value;
    }

    /**
     * Returns and removes many items from storage.
     */
    public pluckMany (...givenKeys: string[]): any[];
    public pluckMany (givenKeys: string[]): any[];
    public pluckMany (givenKeys: any): any[] {
        // Get the array of keys to pluck. Could be
        // multiple string arguments, or an array of strings
        const keys: string[] = Array.isArray(arguments[0]) ? givenKeys : Array.from(arguments);

        // Loop through the keys, and pluck each one.
        return keys.map(key => this.pluck(key));
    }

    /**
     * Removes every item from storage.
     */
    public clear (): void {
        // Resets the cache
        this.cache = {};
        // Clears the driver
        this.driver.clear();
    }
}
