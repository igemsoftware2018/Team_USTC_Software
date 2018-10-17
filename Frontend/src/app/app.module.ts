import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN,  NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AppRoutingModule } from './route/route.module';
import { EditorModule } from './editor/editor.module';
import { ErrorModule } from './error/error.module';
import { Error404Component } from './error/error404/error404.component';
import { FeedsComponent } from './core/feeds/feeds.component';
import { ShareModule } from './share/share.module';
import { HttpExampleComponent } from './http-example/http-example.component';
import {NotificationComponent} from './core/notification/notification.component';
import { RenderService } from './editor/render/render.service';
import { MockRenderComponent } from './mock-render/mock-render.component';
import { ReportRenderComponent } from './editor/report-render/report-render.component';
import { StepsService } from './editor/core/steps.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeedsComponent,
    HttpExampleComponent,
    NotificationComponent,
    MockRenderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    EditorModule,
    ErrorModule,
    ReactiveFormsModule,
    ShareModule,
  ],
  providers: [
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 }},
    { provide: NZ_I18N, useValue: en_US },
    RenderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
