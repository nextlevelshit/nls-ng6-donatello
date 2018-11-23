import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { WorkComponent } from './work/work.component';
import { DetailsComponent } from './details/details.component';
import { RecursiveTreeComponent } from './recursive-tree/recursive-tree.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResponsiveImgDirective } from './responsive-img/responsive-img.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    WorkComponent,
    DetailsComponent,
    RecursiveTreeComponent,
    NotFoundComponent,
    ResponsiveImgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
