// A non-injectable service example. Uses ES6 modules.
// Used in main.ts before the AppModule is butstrapped.
export class ConfigService {
    private api: string;

    static set(property, value) {
        this[property] = value;
    }

    static get(property) {
        return this[property];
    }
}
