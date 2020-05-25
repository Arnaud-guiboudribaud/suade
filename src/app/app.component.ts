import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AppService } from './app.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'suade';
  loading = false;

  constructor(
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry,
    private appService: AppService
  ) {
    iconRegistry
      .addSvgIcon('column', sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/bar.svg`))
      .addSvgIcon('pie', sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/pie.svg`))
      .addSvgIcon('map', sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/map.svg`))
      .addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/pencil.svg`))
      .addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg'));
  }

  ngOnInit() {}
}
