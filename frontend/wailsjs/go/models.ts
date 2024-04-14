export namespace sdk {
	
	export class Share {
	    token: string;
	    frontend_endpoints: string[];
	
	    static createFrom(source: any = {}) {
	        return new Share(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.token = source["token"];
	        this.frontend_endpoints = source["frontend_endpoints"];
	    }
	}

}

