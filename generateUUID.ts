import { v4 } from "https://deno.land/std@0.117.0/uuid/mod.ts";


export default function generateUUID() {
    let myUUID = crypto.randomUUID();
    let isValid = v4.validate(myUUID);

    while(!isValid) {
	myUUID = crypto.randomUUID();
        isValid = v4.validate(myUUID);
    }
    
    return myUUID;
}
