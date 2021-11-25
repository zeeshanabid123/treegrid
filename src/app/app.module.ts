import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContextMenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ColumnChooserService, ContextMenuService, EditService, ExcelExportService, FilterService, FreezeService, PageService, PdfExportService, ReorderService, ResizeService, RowDDService, SelectionService, SortService, ToolbarService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    AppRoutingModule,
    ButtonModule,
    DropDownListAllModule,
    ContextMenuModule,
    DialogModule,
    DropDownListAllModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToolbarModule,
    CheckBoxModule,
    ColorPickerModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    EditService,
    SortService, ResizeService, 
    ExcelExportService, 
    FreezeService,
    PdfExportService, ContextMenuService,
    SelectionService,
    FilterService ,
     ColumnChooserService,
      ToolbarService ,
      ReorderService,
      RowDDService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
