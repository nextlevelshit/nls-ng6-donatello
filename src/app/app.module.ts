import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { WorkComponent } from './work/work.component';
import { DetailsComponent } from './details/details.component';
import { RecursiveTreeComponent } from './recursive-tree/recursive-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    WorkComponent,
    DetailsComponent,
    RecursiveTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
