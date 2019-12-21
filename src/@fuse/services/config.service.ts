import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

export const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');

@Injectable({
    providedIn: 'root'
})

export class FuseConfigService {
    private _configSubject: BehaviorSubject<any>;
    private readonly _defaultConfig: any;

    constructor(
        private _platform: Platform,
        private _router: Router,
        @Inject(FUSE_CONFIG) private _config) {

        this._defaultConfig = _config;
        this.init();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    set config(value) {
        // Get the value from the behavior subject
        let config = this._configSubject.getValue();

        // Merge the new config
        config = _.merge({}, config, value);

        // Notify the observers
        this._configSubject.next(config);
    }

    get config(): any | Observable<any> {
        return this._configSubject.asObservable();
    }

    private init(): void {
        if ( this._platform.ANDROID || this._platform.IOS ) {
            this._defaultConfig.customScrollbars = false;
        }

        this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

        this._router.events
            .pipe(filter(event => event instanceof RoutesRecognized))
            .subscribe(() => {
                if (!_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout)) {
                    const config = _.cloneDeep(this._configSubject.getValue());
                    config.layout = _.cloneDeep(this._defaultConfig.layout);

                    this._configSubject.next(config);
                }
            });
    }

    setConfig(value, opts = {emitEvent: true}): void
    {
        // Get the value from the behavior subject
        let config = this._configSubject.getValue();

        // Merge the new config
        config = _.merge({}, config, value);

        // If emitEvent option is true...
        if ( opts.emitEvent === true )
        {
            // Notify the observers
            this._configSubject.next(config);
        }
    }

    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    getConfig(): Observable<any>
    {
        return this._configSubject.asObservable();
    }

    /**
     * Reset to the default config
     */
    resetToDefaults(): void
    {
        // Set the config from the default config
        this._configSubject.next(_.cloneDeep(this._defaultConfig));
    }
}

