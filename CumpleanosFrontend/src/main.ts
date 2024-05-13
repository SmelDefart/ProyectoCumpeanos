import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from './app/config/config.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


