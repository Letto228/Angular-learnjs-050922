import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';
import { ProductCardModule } from './components/product-card/product-card.module';

// Components/Directives - const.
// Pipe - const
// Modules - module

// Services

@NgModule({
	declarations: [AppComponent], // const ChildComponent = function() {...} // Components/Directives/Pipe
	exports: [], // export ChildComponent // Components/Directives/Pipe
	imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductCardModule
    ], // Modules
	// providers: [], // Services
	bootstrap: [AppComponent],
})
export class AppModule {}
