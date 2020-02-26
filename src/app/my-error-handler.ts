import { ErrorHandler } from '@angular/core';

export class MyErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.log("Error Handler triggered ");
        window.alert("An exception was thrown "+ error.message);
    }
}
